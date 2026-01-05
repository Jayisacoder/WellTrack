import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, context } = await request.json()

    // Build system prompt
    const systemPrompt = `You are a friendly wellness assistant for WellTrack app. Give helpful, concise advice about:
- Sleep improvement
- Stress management
- Exercise motivation
- Mental wellness
- Healthy habits

Keep responses brief (2-3 sentences max). Be encouraging and supportive.
${context ? `User context: Recent mood ${context.recentMood}/10, sleep ${context.recentSleep}h, stress ${context.recentStress}/10, ${context.totalEntries} total entries.` : ''}`

    // Try external AI first
    const provider = process.env.AI_PROVIDER || 'openai'
    
    try {
      let response
      
      if (provider === 'openai' && process.env.OPENAI_API_KEY) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: process.env.AI_MODEL || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 150
          })
        })
        
        if (res.ok) {
          const data = await res.json()
          response = data.choices[0].message.content
        }
      } else if (provider === 'gemini' && process.env.AI_API_KEY) {
        const model = process.env.AI_MODEL || 'gemini-2.0-flash'
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.AI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 150 }
            })
          }
        )
        
        if (res.ok) {
          const data = await res.json()
          response = data.candidates[0].content.parts[0].text
        }
      }
      
      if (response) {
        return NextResponse.json({ response })
      }
    } catch (error) {
      console.error('AI API error:', error)
    }

    // Fallback responses
    const fallbacks = {
      sleep: "Try keeping a consistent bedtime, avoiding screens 1 hour before bed, and keeping your room cool and dark. Quality matters more than quantity!",
      stress: "Deep breathing exercises can help immediately. Try the 4-7-8 technique: breathe in for 4 seconds, hold for 7, exhale for 8. Regular exercise also reduces stress hormones.",
      exercise: "Start small - even a 10-minute walk counts! The key is consistency over intensity. Find activities you enjoy so it doesn't feel like a chore.",
      mood: "Your mood is connected to sleep, exercise, and social connection. Small improvements in any of these areas can boost how you feel. Be patient with yourself!",
      diet: "Focus on whole foods, stay hydrated, and don't skip meals. Blood sugar stability affects both mood and energy levels throughout the day.",
      default: "Taking time to track your wellness is a great first step! Small, consistent habits compound over time. What specific area would you like tips on?"
    }

    const lowerMessage = message.toLowerCase()
    let fallbackResponse = fallbacks.default
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      fallbackResponse = fallbacks.sleep
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('overwhelm')) {
      fallbackResponse = fallbacks.stress
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('active')) {
      fallbackResponse = fallbacks.exercise
    } else if (lowerMessage.includes('mood') || lowerMessage.includes('happy') || lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      fallbackResponse = fallbacks.mood
    } else if (lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
      fallbackResponse = fallbacks.diet
    }

    return NextResponse.json({ response: fallbackResponse })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
