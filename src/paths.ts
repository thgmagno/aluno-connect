import { UserType, EntityType } from '@/lib/types'

const paths = {
  signInPath() {
    return '/entrar'
  },
  homePath(profileSlug: UserType) {
    const homePaths = {
      student: '/student/frequency',
      parent: '/parent/student',
      administrator: '/administrator/dashboard',
      instructor: '/instructor/class',
    }

    return homePaths[profileSlug]
  },
  getEntitiesPath(profileSlug: UserType, entity: EntityType) {
    return `/${profileSlug}/${entity}`
  },
}

export default paths
