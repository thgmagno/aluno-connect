export default function DisplayErrorForm({ error }: { error: string }) {
  return (
    <p className="rounded border border-red-400 bg-red-200 p-2 text-red-700">
      {error}
    </p>
  )
}
