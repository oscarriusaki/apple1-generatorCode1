import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import { Pdf } from './pdf';

export const PdfComponent = () => {

    const increment = () => { 
        window.open('/ventana','_blank');
    }

    return (
        <>
            <button onClick={increment}>view pdf</button>
            <PDFDownloadLink document={<Pdf />} fileName='example1.pdf'>
                <button>download</button>
            </PDFDownloadLink>
        </>
    )
}
