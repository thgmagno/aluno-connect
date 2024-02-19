import toast from 'react-hot-toast'

interface Props {
  action: Promise<unknown>
  error: string
  success: string
}

export default function PromiseNotification({ action, error, success }: Props) {
  return toast.promise(action, {
    loading: 'Processando a requisição',
    error,
    success,
  })
}
