import RenderStudentFrequency from '@/components/student/render-my-frequency'

export default async function StudentHome() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg text-muted-foreground">Minha frequência:</h3>
      <RenderStudentFrequency />
    </div>
  )
}
