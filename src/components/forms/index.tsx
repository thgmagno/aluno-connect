import { student } from './new-student'
import { request } from './new-request'
import { approvalRequest } from './approval-form'
import { setCategoryToRequest } from './set-category'

const Forms = {
  create: {
    student,
    request,
  },
  update: {
    approvalRequest,
    setCategoryToRequest,
  },
}

export default Forms
