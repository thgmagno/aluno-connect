import prisma from '@/lib/prisma'

export async function FindManyStudents() {
  const students = await prisma.student.findMany({
    orderBy: { name: 'asc' },
  })

  return students
}
