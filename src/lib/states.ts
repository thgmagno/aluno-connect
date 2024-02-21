export interface LoginFormState {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string
  }
}

export interface ActivateEmailFormState {
  errors: {
    email?: string[]
    _form?: string
  }
}

export interface SetPasswordFormState {
  errors: {
    email?: string[]
    password?: string[]
    confirm?: string[]
    _form?: string
  }
}

export interface StudentFormState {
  errors: {
    name?: string[]
    email?: string[]
    birthdate?: string[]
    _form?: string
  }
}

export interface ParentFormState {
  errors: {
    name?: string[]
    email?: string[]
    _form?: string
  }
}

export interface InstructorFormState {
  errors: {
    name?: string[]
    email?: string[]
    _form?: string
  }
}

export interface ClassroomFormState {
  errors: {
    course_name?: string[]
    _form?: string
  }
}

export interface RequestFormState {
  errors: {
    justification?: string[]
    _form?: string
  }
}

export interface CreateFrequencyFormState {
  erros: {
    _form?: string
  }
}
