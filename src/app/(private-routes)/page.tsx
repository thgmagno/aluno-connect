import Footer from '@/components/common/footer'

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center space-y-3 p-10 sm:p-20">
        <h1 className="text-center text-lg font-medium text-neutral-400 md:text-xl">
          Bem-vindo ao Aluno Connect
        </h1>
        <p className="text-center text-neutral-500">
          Gerencie frequências de forma simples e eficiente.
        </p>
      </section>
      <Footer />
    </main>
  )
}
