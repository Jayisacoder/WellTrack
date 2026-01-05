import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '../../../lib/prisma'
import { authOptions } from '../../../lib/auth'

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const entries = await prisma.wellnessEntry.findMany({
      where: { 
        user: { 
          email: session.user.email 
        } 
      },
      orderBy: { createdAt: 'desc' },
      take: 30
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    console.log('POST /api/entries - Session:', session?.user?.email)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { mood, stress, sleep, exercise, activities, notes } = body
    
    console.log('Received data:', { mood, stress, sleep, exercise, activities, notes })

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      console.log('User not found:', session.user.email)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('Found user:', user.id)

    // Create entry
    const entry = await prisma.wellnessEntry.create({
      data: {
        userId: user.id,
        mood: parseInt(mood) || 5,
        stress: parseInt(stress) || 5,
        sleep: parseFloat(sleep) || 7,
        exercise: Boolean(exercise),
        activities: activities || null,
        notes: notes || null
      }
    })

    console.log('Created entry:', entry.id)

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error('Error creating entry:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
