import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ isStaff: false })
    }

    const lpStaffEmails = process.env.LP_STAFF_EMAILS?.split(',').map(e => e.trim()) || []
    const isStaff = lpStaffEmails.includes(session.user.email)
    
    return NextResponse.json({ isStaff })
  } catch (error) {
    return NextResponse.json({ isStaff: false })
  }
}
