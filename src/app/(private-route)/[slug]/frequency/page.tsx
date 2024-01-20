import { getAllFrequencies } from '@/actions/read'

// student, parent
export default async function FrequencyPage() {
  const frequencies = await getAllFrequencies()

  return (
    <div>
      <h1>Lista de frequência do aluno</h1>
      {frequencies?.length &&
        frequencies.map((frequency) => (
          <div key={frequency.id}>
            <p>
              {frequency.date.toLocaleDateString('pt-br', {
                dateStyle: 'long',
              })}
            </p>
            <p>{frequency.status}</p>
          </div>
        ))}
    </div>
  )
}
