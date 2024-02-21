'use server'

import { prisma } from '@/lib/prisma'
import { CreateFrequencyFormState } from '@/lib/states'
import { EnumStatus } from '@/lib/types'
import { ParseInt } from '@/utils/parse-int'
import { redirect } from 'next/navigation'

export async function getClassroom(instructorId: number) {
  const promises = await prisma.instructorClassroom
    .groupBy({
      by: ['classroom_id'],
      where: { instructors_id: { has: instructorId } },
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
    where: { classroom_id: id },
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

export async function getClassroomStudents(classroomId: number) {
  try {
    const studentList = await prisma.studentClassroom.findMany({
      where: { classroom_id: classroomId },
      select: { students_id: true },
    })

    const studentsArrays = await Promise.all(
      studentList.flatMap((students) =>
        prisma.user.findMany({
          where: { id: { in: students.students_id }, profile: 'STUDENT' },
          select: {
            id: true,
            name: true,
            email: true,
            profile: true,
            birthdate: true,
          },
        }),
      ),
    )

    const students = studentsArrays.flat()

    return students
  } catch (error) {
    console.error('Erro ao carregar os dados:', error)
  }
}

export async function createClassroomFrequency(
  formState: CreateFrequencyFormState,
  formData: FormData,
): Promise<CreateFrequencyFormState> {
  const classroomId = ParseInt(formData.get('classroom_id') as string)
  const courseName = formData.get('course_name') as string

  try {
    const studentIDs = Array.from(formData.getAll('student'), (student) => ({
      id: Number(student),
    }))

    const [students, frequency] = await Promise.all([
      getClassroomStudents(classroomId),
      prisma.frequency.findFirst({
        where: { classroom_id: classroomId, date: new Date() },
      }),
    ])

    if (!students || frequency) {
      return {
        errors: {
          _form: 'A turma já possui um registro de frequência para essa data',
        },
      }
    }

    const frequencies = await Promise.all(
      students.map(async (student) => {
        const status = studentIDs.some(
          (formStudent) => formStudent.id === student.id,
        )
          ? 'PRESENT'
          : 'ABSENT'

        return prisma.frequency.create({
          data: {
            classroom_name: courseName,
            date: new Date(),
            classroom_id: classroomId,
            student_id: Number(student.id),
            status,
          },
        })
      }),
    )

    await prisma.classroomFrequency.create({
      data: {
        classroom_id: classroomId,
        frequency_id: frequencies[0].id,
      },
    })
  } catch (error) {
    return { errors: { _form: 'Erro ao inserir tabela de frequencia' } }
  }

  redirect(`/turma/${classroomId}`)
}

export async function getClassroomById(classroomId: number) {
  return prisma.classroom.findFirst({
    where: { id: classroomId },
  })
}
