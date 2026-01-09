import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      console.log('Check-staff: No session or email found')
      return NextResponse.json({ isStaff: false })
    }

    const lpStaffEmails = process.env.LP_STAFF_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []
    const userEmail = session.user.email.toLowerCase()
    
    const isStaff = lpStaffEmails.includes(userEmail)
    console.log(`Check-staff: User ${userEmail} isStaff: ${isStaff}`)
    
    return NextResponse.json({ isStaff })
  } catch (error) {
    console.error('Check-staff error:', error)
    return NextResponse.json({ isStaff: false })
  }
}
