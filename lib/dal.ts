import { issues, users } from '@/db/schema'

import { cache } from 'react'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { getSession } from './auth'
import { mockDelay } from './utils'

export const getCurrentUser = async () => {
  await mockDelay(1000)
  const session = await getSession()
  if (!session) return null

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0] || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

export async function getIssues() {
  await mockDelay(1000)
  try {
    const result = await db.query.issues.findMany({
      with: {
        user: true,
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    })
    return result
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw new Error('Failed to fetch issues')
  }
}

export const getIssue = async (id: number) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))
  try {
    return await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: {
        user: true,
      },
    })
  } catch (err) {
    console.error(err)
    return null
  }
}
