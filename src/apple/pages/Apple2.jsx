import React, { useState } from 'react';
import { Lista } from '../components/Lista';
import { PdfComponent } from '../components/PdfComponent';

export const Apple2 = () => { 

  const [sw, setSw] = useState('');

  const generarLista = () => {
    setSw('lista');
  }  
  const generarPdf = () => {
    setSw('pdf');
  }
  return (
    <>
    <div className='styleChoice'>
      <h4>Escoje una opcion</h4>
      <button className='btn btn-primary text-white' onClick={generarLista}>Generador de Lista en React</button>
      <button className='btn btn-primary text-white' onClick={generarPdf}>Generador de Pdf en React</button>
    </div>
    {
      (sw === 'lista')
      ?(<>
        <Lista />
      </>)
      : (sw === 'pdf') ? (<>
        <PdfComponent />
      </>)
      :(<></>)
    }
    
    </>
  )
}
