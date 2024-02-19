'use server'

import { prisma } from '@/lib/prisma'

export async function getStudent(id: number) {
  return prisma.studentParent
    .groupBy({
      by: ['students_id'],
      where: { parent_id: id },
    })
    .then((list) =>
      prisma.user.findMany({
        where: { id: { in: list.map((id) => id.students_id).flat() } },
      }),
    )
}

export async function getStudentClassroom(studentId: number) {
  const promises = await prisma.studentClassroom
    .findMany({
      where: { students_id: { has: studentId } },
      select: { classroom_id: true },
    })
    .then((list) =>
      list.map((item) =>
        prisma.classroom.findUnique({
          where: { id: item.classroom_id },
        }),
      ),
    )

  return Promise.all(promises)
}

export async function getStudentFrequency(
  studentId: number,
  classroomId: number,
) {
  return prisma.frequency.findMany({
    where: { student_id: studentId, classroom_id: classroomId },
    orderBy: { date: 'desc' },
  })
}
