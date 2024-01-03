import BtnGoBack from '@/modules/common/components/btn-go-back'
import ContentMain from '@/modules/common/components/content-main'
import DeleteForm from '@/modules/common/components/delete-form'
import postgres from 'postgres'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: 'allow',
})

export default async function StudentList() {
  const students = await sql`SELECT * FROM "Student" ORDER BY name`

  return (
    <ContentMain>
      <BtnGoBack href="/" />
      <h1 className="col-span-2 mb-5 mt-5 font-semibold text-muted md:mt-0">
        Lista de alunos
      </h1>
      <div className="flex flex-col">
        <ul className="col-auto">
          {students.map((student) => (
            <li key={student.id}>
              {student.name}
              <DeleteForm id={student.id} name={student.name} />
            </li>
          ))}
        </ul>
      </div>
    </ContentMain>
  )
}
