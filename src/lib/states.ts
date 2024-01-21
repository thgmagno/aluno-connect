export interface StudentFormState {
  errors: {
    name?: string[]
    email?: string[]
    birthdate?: string[]
    _form?: string[]
  }
}

export interface InstructorFormState {
  errors: {
    name?: string[]
    email?: string[]
    _form?: string[]
  }
}

export interface ParentFormState {
  errors: {
    name?: string[]
    email?: string[]
    _form?: string[]
  }
}

export interface ClassFormState {
  errors: {
    course_name?: string[]
    _form?: string[]
  }
}

export interface FrequencyFormState {
  success: boolean
  errors: {
    _form?: string
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

export interface RequestFormState {
  errors: {
    justification?: string[]
    media?: string[]
    _form?: string[]
  }
}
