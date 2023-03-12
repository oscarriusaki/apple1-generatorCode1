import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime  } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

export const GeneradorTextoCodigo = ({code, textClass, typeFile ,dateType}) => {


    const [text, setText] = useState(code);
    const [botonState, setBotonState] = useState(false);
    const [botonState2, setBotonState2] = useState(false);
    const changeButtonClass = () => {
        setBotonState2(!botonState2);
        setBotonState(false);
        restablecer();
    }
    const changeButton = () => {
        setBotonState(!botonState);
        setBotonState2(false);
        restablecer();
    }

    useEffect(() => {
        setText(code);
    }, [code])

    const restablecer = () => {
        setTimeout(restablecerCopy, 2000);
    }
    const restablecerCopy = () => {
        setBotonState(false);
        setBotonState2(false);
    }


  return (
    <>
        <div className='tarjetaCodigo'>
            <div className='padreCabeceraCopyTypeCode'>
                <div className='codigoTarjetaTipoCodigo'>
                    {typeFile}
                </div>
                <div className='codigoTarjetaTipoCodigoCenter'>
                    <div className='textoClaseCopy'>
                        <SyntaxHighlighter language='javascript' style={ monokaiSublime } className='agrandarTextoCodigo2'> 
                             {textClass} 
                        </SyntaxHighlighter>                        
                        <CopyToClipboard text = {textClass}>
                            <button onClick={changeButtonClass } className='styleClassCopy'>
                                {
                                    (!botonState2)
                                    ? 'copy'
                                    : 'copied!'
                                }
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className='codigoTarjetaCabeza'>
                    {
                        (!botonState) 
                        ? <FontAwesomeIcon icon={faClipboard}  className='cursor-pointer'/>
                        : <FontAwesomeIcon icon={faCheck} className='cursor-pointer'/>
                    }
                    <CopyToClipboard text = {text}>
                        <button onClick={changeButton } className='clipBoardButton'>
                            {
                                (!botonState)
                                ? 'copy to clipboard'
                                : 'copied!'
                            }
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
            <div className='codigoTarjetaCuerpo'>
                {/* <CopyToClipboard text={text}> */}
                <SyntaxHighlighter language={`${dateType}`} style={monokaiSublime} className='agrandarTextoCodigo' > 
                    {text} 
                </SyntaxHighlighter>
                {/* </CopyToClipboard> */}
            </div>
            {/* <br />
            <br /> */}
        </div>
    </>
  )
}
