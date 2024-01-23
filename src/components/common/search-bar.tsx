'use client'

import SetFilter from '@/actions/querys/set-filter'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <form
      action={SetFilter}
      className="my-5 flex w-full items-center rounded-md bg-neutral-950/60 md:w-64"
    >
      <input type="hidden" name="path" value="student" />
      <input
        type="text"
        name="search"
        placeholder="Pesquisar..."
        className="w-full bg-transparent p-1.5 text-white outline-none"
      />
      <button type="submit">
        <Search className="mr-2 h-5 w-5 text-white" />
      </button>
    </form>
  )
}
