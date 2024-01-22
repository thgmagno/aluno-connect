import { Student } from './new-student'
import { Request } from './new-request'
import { ApprovalRequest } from './approval-form'
import { SetCategoryToRequest } from './set-category'

const Forms = {
  Create: {
    Student,
    Request,
  },
  Update: {
    ApprovalRequest,
    SetCategoryToRequest,
  },
}

export default Forms
