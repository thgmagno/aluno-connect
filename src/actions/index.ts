'use server'

// import prisma from '@/lib/prisma'

export async function getFrequency(id: string) {
  const frequency = [
    { id: 1, date: new Date(), status: true },
    { id: 2, date: new Date(), status: false },
  ]
  return frequency
}

export const studentActions = {
  getFrequency,
}
