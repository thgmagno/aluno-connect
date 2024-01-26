import prisma from '@/lib/prisma'
import { EntityType } from '@/lib/types'
import type {
  Frequency,
  Instructor,
  Student,
  Parent,
  Class,
  Request,
} from '@prisma/client'

type EntityDataType = {
  instructor: Instructor | null
  student: Student | null
  parent: Parent | null
  classroom: Class | null
  frequency: Frequency | null
  request: Request | null
}

export async function EntityData(
  entity: EntityType,
  entityId: string,
): Promise<EntityDataType[keyof EntityDataType]> {
  const querys = {
    instructor: prisma.instructor.findUnique({ where: { id: entityId } }),
    student: prisma.student.findUnique({ where: { id: entityId } }),
    parent: prisma.parent.findUnique({ where: { id: entityId } }),
    classroom: prisma.class.findUnique({ where: { id: entityId } }),
    frequency: prisma.frequency.findUnique({ where: { id: entityId } }),
    request: prisma.request.findUnique({ where: { id: entityId } }),
  }

  const response = await querys[entity]

  return response as EntityDataType[keyof EntityDataType]
}
