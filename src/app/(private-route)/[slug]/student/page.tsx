import { getAllStudents } from '@/actions/read'

// parent, instructor, administrator
export default async function StudentsPage() {
  const students = await getAllStudents()

  return (
    <div>
      <h1>Listar todos os estudantes</h1>
      {students?.length &&
        students.map((student) => (
          <div key={student.id}>
            <p>{student.name}</p>
            <p>{student.email}</p>
          </div>
        ))}
    </div>
  )
}
