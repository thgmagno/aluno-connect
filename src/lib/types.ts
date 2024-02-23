export type EnumProfile = 'STUDENT' | 'PARENT' | 'INSTRUCTOR' | 'ADMINISTRATOR'

export type EnumStatus =
  | 'PRESENT'
  | 'ABSENT'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'

export type User = {
  id: number
  name: string
  email: string
  password: string | null
  profile: EnumProfile
  birthdate: Date | null
}

export type PartialUser = {
  id: number
  name: string
  email: string
  profile: EnumProfile
  birthdate?: Date | null
}

export type Classroom = {
  id: number
  course_name: string
}

export type Request = {
  id: number
  student_id: number
  student_name: string
  parent_id: number | null
  frequency_id: number
  course_name: string
  justification: string
  imageUrl: string | null
  category: string | null
  frequency: {
    id: number
    status: EnumStatus
    date: Date
  }
}

export type Frequency = {
  id: number
  date: Date
  status: EnumStatus
  student_id: number
  classroom_id: number
  classroom_name: string
}

export type FrequencyGrouped = {
  date: string
  students: {
    name: string
    status: EnumStatus
  }[]
}

export type PayloadType = {
  payload: {
    sub: string
    name: string
    email: string
    profile: string
    birthdate: string | null
  }
}
