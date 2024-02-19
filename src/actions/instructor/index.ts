'use server'

import { prisma } from '@/lib/prisma'
import { EnumStatus } from '@/lib/types'

export async function getClassroom(id: number) {
  const promises = await prisma.instructorClassroom
    .groupBy({
      by: ['classroom_id'],
      where: { instructors_id: { has: id } },
    })
    .then((list) =>
      list.map((item) =>
        prisma.classroom.findMany({
          where: { id: item.classroom_id },
        }),
      ),
    )

  return (await Promise.all(promises)).flat()
}

export async function getClassroomFrequency(id: number) {
  const frequencies = await prisma.frequency.findMany({
    where: { id },
    include: { student: { select: { name: true } } },
    orderBy: { student: { name: 'asc' } },
  })

  const groupedDate: { [key: string]: { name: string; status: EnumStatus }[] } =
    frequencies.reduce(
      (result, item) => {
        const date = new Date(item.date).toLocaleDateString('pt-br', {
          dateStyle: 'long',
        })

        if (!result[date]) {
          result[date] = []
        }

        result[date].push({
          name: item.student.name,
          status: item.status as EnumStatus,
        })

        return result
      },
      {} as { [key: string]: { name: string; status: EnumStatus }[] },
    )

  const formattedDate = Object.entries(groupedDate).map(([date, students]) => ({
    date,
    students,
  }))

  return formattedDate
}
