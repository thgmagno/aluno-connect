import prisma from '@/lib/prisma'

export default async function AdmRequest() {
  const listRequest = await prisma.request.findMany({
    orderBy: { date: 'desc' },
  })

  return (
    <>
      {listRequest.length > 0 ? (
        <p>Redenrizando...</p>
      ) : (
        <p className="text-center text-xl text-muted-foreground">
          Não existem solicitações em aberto no momento
        </p>
      )}
    </>
  )
}
