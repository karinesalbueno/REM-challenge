import Header from './components/Header';
import { ItemListPage } from './components/ItemListPage';
import './index.css'

export default function App() {
  return (
    <div className="container min-h-screen max-w-screen bg-black p-6">
      <Header />

      <main className='mx-auto px-4 md:px-8 py-8 sm:py-10'>
        <section className='flex flex-col items-center pb-8'>
          <h3 className='text-xl font-bold'>
            Choose Your Skip Size
          </h3>
          <p className='py-2 text-center'>
            Select the skip size that best suits your needs
          </p>
        </section>

        <ItemListPage />
      </main>
    </div>
  );
}