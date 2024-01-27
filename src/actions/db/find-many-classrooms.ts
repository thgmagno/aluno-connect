import prisma from '@/lib/prisma'

export async function FindManyClassrooms() {
  const classrooms = await prisma.classroom.findMany({
    orderBy: { course_name: 'asc' },
  })

  return classrooms
}
