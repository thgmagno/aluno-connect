const paths = {
  signInPath() {
    return `/entrar`
  },
  homeStudentPath(profileSlug: string) {
    return `/${profileSlug}/frequency`
  },
  homeInstructorPath(profileSlug: string) {
    return `/${profileSlug}/class`
  },
  homeParentPath(profileSlug: string) {
    return `/${profileSlug}/student`
  },
  homeAdministratorPath(profileSlug: string) {
    return `/${profileSlug}/dashboard`
  },
}

export default paths
