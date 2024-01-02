import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function BtnPromise({ title }: { title: string }) {
  const { pending } = useFormStatus()
  const spinner = (
    <div className="flex gap-1">
      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-300 duration-500" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-200 duration-700" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-100 duration-1000" />
    </div>
  )

  return (
    <Button
      variant={'default'}
      type="submit"
      className={`w-20 ${
        pending
          ? 'animate-pulse cursor-not-allowed'
          : 'bg-teal-700 text-zinc-50 hover:bg-teal-800'
      }`}
    >
      {pending ? spinner : title}
    </Button>
  )
}
