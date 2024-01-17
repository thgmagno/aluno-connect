import RenderRequests from '@/components/administrator/render-requests'
import prisma from '@/lib/prisma'

export default async function AdmRequest() {
  const listRequest = await prisma.request.findMany({
    orderBy: { date: 'desc' },
    include: { studentID: true },
  })

  return (
    <>
      {!listRequest.length ? (
        <p className="text-center text-xl text-muted-foreground">
          Não existem solicitações em aberto no momento
        </p>
      ) : (
        <RenderRequests data={listRequest} />
      )}
    </>
  )
}
