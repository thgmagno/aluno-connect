'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useCallback, ChangeEvent } from 'react'

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (search) {
      router.push(`student?search=${encodeURIComponent(search)}`)
    } else {
      router.push('student')
    }
  }

  return (
    <section className="flex">
      <form
        onSubmit={handleSearchSubmit}
        className="my-5 flex w-full items-center rounded-md bg-neutral-950/60 md:w-64"
      >
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Pesquisar..."
          className="w-full bg-transparent p-1.5 text-white outline-none"
        />
        <button type="submit">
          <Search className="mr-2 h-5 w-5 text-white" />
        </button>
      </form>
      <button
        onClick={() => setSearch('')}
        className="ml-3 text-sm font-medium text-muted-foreground"
      >
        Limpar
      </button>
    </section>
  )
}
