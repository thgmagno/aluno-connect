export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="my-5 text-center text-2xl font-light text-neutral-400">
      {title}
    </h1>
  )
}
