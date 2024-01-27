import prisma from '@/lib/prisma'

export async function FindManyInstructors() {
  const instructors = await prisma.instructor.findMany({
    orderBy: { name: 'asc' },
  })

  return instructors
}
