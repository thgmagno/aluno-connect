import { UserType } from '@/lib/types'

const paths = {
  signInPath() {
    return '/login'
  },
  homePath(profileSlug: UserType) {
    const homePaths = {
      student: '/student/frequency',
      parent: '/parent/student',
      administrator: '/administrator/dashboard',
      instructor: '/instructor/classroom',
    }

    return homePaths[profileSlug]
  },
}

export default paths
