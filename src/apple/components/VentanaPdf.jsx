import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { Pdf } from './pdf'

export const VentanaPdf = () => {
  return (
    <>
      <PDFViewer style={{width:'100%', height: '100vh'}}>
          <Pdf/>
      </PDFViewer>
    </>
  )
}
