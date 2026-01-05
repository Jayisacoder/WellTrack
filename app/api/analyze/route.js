import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../lib/prisma'

// AI Provider functions
async function callOpenAI(prompt, systemPrompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    })
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${error}`)
  }
  
  const data = await response.json()
  return data.choices[0].message.content
}

async function callGemini(prompt, systemPrompt) {
  const model = process.env.AI_MODEL || 'gemini-2.0-flash'
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.AI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\n${prompt}` }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      })
    }
  )
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Gemini API error: ${error}`)
  }
  
  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

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
    const prompt = `Analyze this wellness data and give brief, punchy insights.

Today: Mood ${entry.mood}/10, Stress ${entry.stress}/10, Sleep ${entry.sleep}hrs, Exercise: ${entry.exercise ? 'Yes' : 'No'}
Averages (${entries.length} days): Mood ${avgMood}, Stress ${avgStress}, Sleep ${avgSleep}hrs, Exercise ${exerciseRate}%
Correlations: Mood with exercise ${moodWithExercise} vs without ${moodWithoutExercise}. Mood with 7+ hrs sleep ${moodWithGoodSleep} vs <6hrs ${moodWithPoorSleep}.

Respond with EXACTLY this format (keep each point to 1 short sentence):
📊 **Pattern:** [one key observation from the data]
💡 **Tip:** [one specific actionable recommendation]
✨ **Note:** [brief encouragement or observation]

Be concise. No fluff. Max 50 words total.`

    const systemPrompt = 'You are a supportive mental wellness advisor who provides data-driven insights based on user wellness tracking data.'

    // Determine which AI provider to use based on AI_PROVIDER env variable
    const provider = process.env.AI_PROVIDER || 'openai'
    let insights
    
    try {
      if (provider === 'gemini') {
        insights = await callGemini(prompt, systemPrompt)
      } else {
        insights = await callOpenAI(prompt, systemPrompt)
      }
    } catch (aiError) {
      console.error('External AI failed, using local analysis:', aiError.message)
      // Use local analysis as fallback
      insights = generateLocalInsights(entry, entries, {
        avgMood, avgStress, avgSleep, exerciseRate,
        moodWithExercise, moodWithoutExercise,
        moodWithGoodSleep, moodWithPoorSleep
      })
    }

    // Save insights to the entry
    await prisma.wellnessEntry.update({
      where: { id: entryId },
      data: { aiInsights: insights }
    })

    return NextResponse.json({ insights })

  } catch (error) {
    console.error('AI analysis error:', error.message)
    console.error('Full error:', error)
    
    // Fallback response if AI service fails
    return NextResponse.json({
      insights: `We're analyzing your data locally. Your entry has been saved successfully.`
    })
  }
}

// Local AI-like analysis function that generates insights from data patterns
function generateLocalInsights(entry, entries, stats) {
  const moodDiff = entry.mood - parseFloat(stats.avgMood)
  
  // Pattern observation
  let pattern = ''
  if (stats.moodWithExercise !== 'N/A' && stats.moodWithoutExercise !== 'N/A') {
    const diff = parseFloat(stats.moodWithExercise) - parseFloat(stats.moodWithoutExercise)
    if (diff > 0.5) {
      pattern = `Your mood is ${stats.moodWithExercise} on exercise days vs ${stats.moodWithoutExercise} without.`
    }
  }
  if (!pattern && stats.moodWithGoodSleep !== 'N/A') {
    pattern = `Sleep impacts you: mood ${stats.moodWithGoodSleep} with 7+ hrs vs ${stats.moodWithPoorSleep} with less.`
  }
  if (!pattern) {
    pattern = `Your avg mood is ${stats.avgMood}/10 across ${entries.length} entries.`
  }
  
  // Tip
  let tip = ''
  if (!entry.exercise && stats.moodWithExercise !== 'N/A') {
    tip = 'Try adding a short walk tomorrow.'
  } else if (entry.sleep < 7) {
    tip = 'Aim for 7+ hours of sleep tonight.'
  } else if (entry.stress >= 6) {
    tip = 'Try a 2-minute breathing exercise.'
  } else {
    tip = 'Keep up your current routine!'
  }
  
  // Note
  let note = ''
  if (moodDiff >= 1) {
    note = `Mood ${entry.mood}/10 is above your avg—nice!`
  } else if (moodDiff <= -1) {
    note = `Mood ${entry.mood}/10 is below avg. Tomorrow's a new day.`
  } else {
    note = `Steady mood at ${entry.mood}/10. Consistency matters.`
  }
  
  return `📊 **Pattern:** ${pattern}\n\n💡 **Tip:** ${tip}\n\n✨ **Note:** ${note}`
}
