export interface CreateStudentFormState {
  errors: {
    name?: string[]
    email?: string[]
    birthdate?: string[]
    _form?: string[]
  }
}

export interface AuthenticateUserFormState {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}

export interface AuthenticateEmailFormState {
  errors: {
    email?: string[]
    _form?: string[]
  }
}

export interface RegisterUserPassword {
  errors: {
    password?: string[]
    confirm?: string[]
    _form?: string[]
  }
}
