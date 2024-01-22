// CREATE
import { Student } from './create/Student'
import { Request } from './create/Request'

// READ
import { Classrooms } from './read/getAll/Classrooms'
import { Frequencies } from './read/getAll/Frequencies'
import { Instructors } from './read/getAll/Intructors'
import { Parents } from './read/getAll/Parents'
import { Requests } from './read/getAll/Requests'
import { Students } from './read/getAll/Students'
import { EntityData } from './read/getUnique/EntityData'

// UPDATE
import { ApproveRequest } from './update/ApproveRequest'
import { RejectRequest } from './update/RejectRequest'
import { SetCategoryToRequest } from './update/SetCategory'

const Mutations = {
  Create: {
    Student,
    Request,
  },
  Read: {
    findMany: {
      Classrooms,
      Frequencies,
      Instructors,
      Parents,
      Requests,
      Students,
    },
    findUnique: {
      EntityData,
    },
  },
  Update: {
    ApproveRequest,
    RejectRequest,
    SetCategoryToRequest,
  },
}

export default Mutations
