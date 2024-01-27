import prisma from '@/lib/prisma'

export async function FindManyParents() {
  const parents = await prisma.parent.findMany({
    orderBy: { name: 'asc' },
  })

  return parents
}
