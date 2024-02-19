import { PartialUser } from '@/lib/types'
import { create } from 'zustand'

interface UserStore {
  user: PartialUser | null
  setUser: (newUser: PartialUser) => void
  clearUser: () => void
}

export const userStore = create<UserStore>((set) => ({
  user: null,

  setUser: (newUser: PartialUser) => set({ user: newUser }),

  clearUser: () => set({ user: null }),
}))
