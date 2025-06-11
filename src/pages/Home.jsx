import React from 'react'
import MiniCalendar from '../component/MiniCalendar'

export default function Home() {
  
  return (


    <div className='h-full w-4/5 flex flex-col gap-5 px-5 py-5'>
      <div className='bg-selected rounded-4xl w-full h-1/2 flex'>
        <div className='h-full w-full px-10 py-5 flex flex-col justify-center text-white'>
          <h2 className='text-3xl font-semibold mb-4'>Il Nostro Obiettivo</h2>
          <p className='mb-4 text-sm'>
            #FucecchioèLibera è un gruppo nato il 1° settembre 2016, in occasione del 72° anniversario della liberazione di Fucecchio. Il nostro obiettivo è promuovere i valori di libertà, uguaglianza e pace.
          </p>
          <p className='mb-4 text-sm'>
            Il gruppo è stato fondato da giovani che hanno partecipato ai viaggi della memoria organizzati dall'A.N.E.D., ma si è poi allargato a chiunque condivida l'impegno per una società più inclusiva e giusta.
          </p>
          <p className='mb-4 text-sm'>
            Siamo anche impegnati nella salvaguardia dell'ambiente, nel rispetto delle minoranze e nel supporto ai più vulnerabili, con l'obiettivo di costruire un futuro migliore per tutti.
          </p>
        </div>
      </div>
      <div className='w-full h-1/2 flex space-x-5'>
        <div className='bg-secondary w-1/3 h-full rounded-4xl flex items-center justify-center'>
          <MiniCalendar />
        </div>
        <div className='bg-gray-400/60 w-2/3 h-full rounded-4xl items-center flex flex-col justify-center'>
          <p className='mb-4 text-3xl font-semibold'>
            I nostri valori fondamentali sono:
          </p>
          <ul className='list-disc text-xl'>
            <li>Memoria storica e rispetto reciproco</li>
            <li>Partecipazione attiva di tutti i cittadini</li>
            <li>Lotta contro ogni forma di discriminazione</li>
            <li>Rifiuto di qualsiasi apologia di fascismo e regimi totalitari</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
