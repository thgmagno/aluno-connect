import prisma from '@/lib/prisma'

export async function FindManyRequests() {
  const requests = await prisma.request.findMany({
    include: { frequencyID: true, studentID: true },
    orderBy: { frequencyID: { date: 'desc' } },
  })

  return requests
}
