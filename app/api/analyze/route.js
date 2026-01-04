import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../lib/prisma'

export async function POST(request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { entryId } = await request.json()

    // Get the specific entry
    const entry = await prisma.wellnessEntry.findUnique({
      where: { id: entryId }
    })

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      )
    }

    // Get user's wellness history for context
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        wellnessEntries: {
          orderBy: { createdAt: 'desc' },
          take: 30
        }
      }
    })

    if (!user || user.wellnessEntries.length === 0) {
      return NextResponse.json({
        insights: "We need more data to provide meaningful insights. Keep tracking your wellness daily!"
      })
    }

    // Calculate statistics for AI context
    const entries = user.wellnessEntries
    const avgMood = (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)
    const avgStress = (entries.reduce((sum, e) => sum + e.stress, 0) / entries.length).toFixed(1)
    const avgSleep = (entries.reduce((sum, e) => sum + e.sleep, 0) / entries.length).toFixed(1)
    const exerciseCount = entries.filter(e => e.exercise).length
    const exerciseRate = ((exerciseCount / entries.length) * 100).toFixed(0)

    // Find correlations
    const entriesWithExercise = entries.filter(e => e.exercise)
    const entriesWithoutExercise = entries.filter(e => !e.exercise)
    
    const moodWithExercise = entriesWithExercise.length > 0 
      ? (entriesWithExercise.reduce((sum, e) => sum + e.mood, 0) / entriesWithExercise.length).toFixed(1)
      : 'N/A'
    
    const moodWithoutExercise = entriesWithoutExercise.length > 0
      ? (entriesWithoutExercise.reduce((sum, e) => sum + e.mood, 0) / entriesWithoutExercise.length).toFixed(1)
      : 'N/A'

    const goodSleepEntries = entries.filter(e => e.sleep >= 7)
    const poorSleepEntries = entries.filter(e => e.sleep < 6)
    
    const moodWithGoodSleep = goodSleepEntries.length > 0
      ? (goodSleepEntries.reduce((sum, e) => sum + e.mood, 0) / goodSleepEntries.length).toFixed(1)
      : 'N/A'
    
    const moodWithPoorSleep = poorSleepEntries.length > 0
      ? (poorSleepEntries.reduce((sum, e) => sum + e.mood, 0) / poorSleepEntries.length).toFixed(1)
      : 'N/A'

    // Construct AI prompt with actual user data
    const prompt = `You are a mental wellness advisor analyzing a user's wellness tracking data. Provide personalized, actionable insights based on their patterns.

User's Current Entry:
- Mood: ${entry.mood}/10
- Stress: ${entry.stress}/10
- Sleep: ${entry.sleep} hours
- Exercise: ${entry.exercise ? 'Yes' : 'No'}
- Activities: ${entry.activities || 'None logged'}
- Notes: ${entry.notes || 'None'}

Historical Data (${entries.length} entries):
- Average Mood: ${avgMood}/10
- Average Stress: ${avgStress}/10
- Average Sleep: ${avgSleep} hours
- Exercise Frequency: ${exerciseRate}% of days

Correlations Found:
- Mood on days WITH exercise: ${moodWithExercise}/10
- Mood on days WITHOUT exercise: ${moodWithoutExercise}/10
- Mood with 7+ hours sleep: ${moodWithGoodSleep}/10
- Mood with less than 6 hours sleep: ${moodWithPoorSleep}/10

Based on this data, provide:
1. 2-3 specific observations about their wellness patterns
2. 2-3 actionable recommendations tailored to their data
3. Encouragement for positive trends or gentle guidance for areas needing attention

Keep the response conversational, supportive, and under 200 words. Focus on what the DATA shows, not generic advice.`

    // Call AI service (OpenAI example - adjust based on your AI provider)
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a supportive mental wellness advisor who provides data-driven insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    })

    if (!aiResponse.ok) {
      throw new Error('AI service error')
    }

    const aiData = await aiResponse.json()
    const insights = aiData.choices[0].message.content

    // Save insights to the entry
    await prisma.wellnessEntry.update({
      where: { id: entryId },
      data: { aiInsights: insights }
    })

    return NextResponse.json({ insights })

  } catch (error) {
    console.error('AI analysis error:', error)
    
    // Fallback response if AI service fails
    return NextResponse.json({
      insights: "I'm having trouble connecting to the AI service right now. Your entry has been saved successfully. Please try again later for personalized insights!"
    })
  }
}
