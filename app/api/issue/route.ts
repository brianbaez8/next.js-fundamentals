import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, getIssues } from '@/lib/dal'

import { createIssue } from '@/app/actions/issues'
import { db } from '@/db'
import { issues } from '@/db/schema'

export const GET = async () => {
  try {
    const issues = await db.query.issues.findMany({})

    return NextResponse.json({
      data: {
        issues,
      },
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error' })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const newIssue = await db.insert(issues).values(body).returning()
    return NextResponse.json({ message: 'Okay', data: newIssue })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error' })
  }
}
