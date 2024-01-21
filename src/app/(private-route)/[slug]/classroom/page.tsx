import getAll from '@/actions/read/getAll'
import React from 'react'

// instructor, administrator
export default async function ClassroomsPage() {
  const classrooms = await getAll.Classrooms()

  return (
    <React.Fragment>
      <h1 className="text-muted md:text-xl">Lista de todas as turmas</h1>
      {classrooms?.length ? (
        classrooms.map((classroom) => (
          <div key={classroom.id}>
            <p>{classroom.course_name}</p>
          </div>
        ))
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-muted-foreground">
            Não há nenhuma turma cadastrada
          </p>
        </div>
      )}
    </React.Fragment>
  )
}
