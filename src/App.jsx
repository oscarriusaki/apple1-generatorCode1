import { faCode, faPlus, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataBaseDelete, 
          DataBaseGet, 
          DataBaseGets, 
          DataBasePost, 
          DataBasePut, 
          NodejsControllers, 
          NodejsRouter } from './helpers';
import { useForm } from './hooks/useForm';
import { GeneradorTextoCodigo } from './ui/GeneradorTextoCodigo';


export const App = () => {
 
  const [inputs, setInputs] = useState([])
  const [count, setCount] = useState(1);
  const [map, setMap] = useState({
    active: false,
    nombreTabla: ''
  });
  const [map2, setMap2] = useState({})
  
  const { nombreTabla, active, onInputChange, activeCode, onReset, ...resto } = useForm(map);
  const { onInputChange2 ,...resto2 } = useForm(map2);
 
  
  let nombreFuncionOriginal = nombreTabla.split(' ');
  nombreFuncionOriginal = nombreFuncionOriginal.map(resp => {
      return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
  })
  nombreFuncionOriginal = nombreFuncionOriginal.join('');
  let ref1 = useRef();
  let ref3 = useRef();
  
  const { nodejsControllers } = NodejsControllers(resto, nombreTabla, resto2);
  const { nodejsRouter } = NodejsRouter(resto, nombreTabla, resto2);
  const { dataBaseGet } = DataBaseGet(resto, nombreTabla, resto2);
  const { dataBaseGets } = DataBaseGets(resto, nombreTabla, resto2);
  const { dataBasePost } = DataBasePost(resto, nombreTabla, resto2);
  const { dataBasePut } = DataBasePut(resto, nombreTabla, resto2);
  const { dataBaseDelete } = DataBaseDelete(resto, nombreTabla, resto2);

  const navigate = useNavigate()

  const ref2 = useRef();
  const ref4 = useRef();
  
  const onInputSubmit = (value) => {
    value.preventDefault(); 
    console.log(value )

    if(nombreTabla.trim().length < 1){
      ref4.current.focus();
      return
    }
    activeCode(true)
  } 
  const clear = () => { 
    // inputs = [];
    setInputs([])
    setCount(1) 
    let c = false;
    for (const n in resto2.inputForm) {
      c=true;
    }
    if(c){
      onReset()    
      setMap({
        active: false,
        nombreTabla: ''
      }) 
    }
    activeCode(false)
    
      
  } 
  const firstRef = useRef(null)

  const addColumn = () => {
  
    console.log(inputs) 
      setInputs((prevInputs) => [
        ...prevInputs,
        {
          id:count, 
          name: `columna${count}`,
        },
      ])
    

    
    setCount(count+1);
    setMap({
      ...map,
      [`columna${count}`] : `data${count}`
    })
    setMap2({
      ...map2,
      [`columna${count}`] : `data${count}`
    })
    activeCode(false)
  }
  useEffect(() => {
    if(firstRef.current){ 
      firstRef.current.focus()
    }
  }, [addColumn])
  
  useEffect(() => {
    const handleKeyDowm = (event) => { 
      if(event.ctrlKey && event.key === 'Backspace'){
        clear();
      }
    }
    document.addEventListener('keydown', handleKeyDowm)
  
    return () => {
      document.removeEventListener('keydown', handleKeyDowm)
    }
  }, [clear])
  
  useEffect(() => {
    const handleKeyDowm  = (event) => {
      if(event.ctrlKey && event.key === '.'){
        addColumn();
      }
    }
    document.addEventListener('keydown', handleKeyDowm);
    if(ref1.current){
      ref1.current.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDowm)
    }
  }, [ addColumn ])
  useEffect(() => {
    const handlekeyDowm = (event) =>{
      if(event.key === 'Enter' && ref2.current){
          onInputSubmit(event);
          // console.log(ref2, 'etado del formulario')
      }
    }
    document.addEventListener('keydown', handlekeyDowm);
  
    return () => {
      document.removeEventListener('keydown', handlekeyDowm)
    }
  }, [onInputSubmit])
  
  return (
    <>
    <div className='cuerpoBoton2'>  
        <form onSubmit={onInputSubmit} autoComplete='off' className='cuerpoBoton' ref={ref2}>
          <input 
              type='text' 
              className='inputStyle'
              placeholder='Nombre de la tabla separado'
              name='nombreTabla'
              value={nombreTabla}
              onChange={onInputChange}
              ref={ref4}
            /> 

          <button type='submit' className='botonGenerateStyle' >
            <FontAwesomeIcon icon={faCode} />
            <span style={{paddingLeft:'2%'}}>Generate</span> 
          </button>
        </form>
      <button type='submit' className='botonAddColumnStyle' onClick={addColumn}>
        <FontAwesomeIcon icon={faPlus} />
        <span style={{paddingLeft:'2%'}}  >Add ctrl + .</span> 
      </button> 
      <button type='submit' className='botonClearStyle' onClick={clear} disabled={!active && count < 0}>
        <FontAwesomeIcon icon={faTrashCan} /> 
        <span style={{paddingLeft:'2%'}}>Clear ctrl + backspace</span> 
      </button>
    </div>
    {
      (active ) 
      ? (<>
          <GeneradorTextoCodigo code={nodejsRouter} textClass={`${nombreFuncionOriginal}.js`} typeFile={'Nodejs / Router'} />
          <GeneradorTextoCodigo code={nodejsControllers} textClass={`${nombreFuncionOriginal}.js`} typeFile={'Nodejs / Controller'} />
          <GeneradorTextoCodigo code={dataBaseGet} textClass={`fn_get${nombreFuncionOriginal}`} typeFile={'Database / Get / id'} />
          <GeneradorTextoCodigo code={dataBaseGets} textClass={`fn_get${nombreFuncionOriginal}s`} typeFile={'Database / Get'} />
          <GeneradorTextoCodigo code={dataBasePost} textClass={`fn_post${nombreFuncionOriginal}`} typeFile={'Database / Post'} />
          <GeneradorTextoCodigo code={dataBasePut} textClass={`fn_put${nombreFuncionOriginal}`} typeFile={'Database / Put'} />
          <GeneradorTextoCodigo code={dataBaseDelete} textClass={`fn_delete${nombreFuncionOriginal}`} typeFile={'Database / Delete'} />
          <br /><br />
        </>
      )
      : <p className='MensajeInsert'>Insert column to generate code...</p>
    }
    {
      (!active) && 
        (
          (count > 0) &&
          <form autoComplete='off' className='tabla' ref={ref3}>
            {
              inputs.map((input, index) => (
                <div key={input.id}>
                  <input   
                    type={'text'} 
                    placeholder={`Column ${input.id}`}
                    className='inputStyleTabla'
                    name={input.name} 
                    value={resto[input.name] ?? ''} 
                    onChange={onInputChange}  
                    ref={index === inputs.length -1 ? firstRef : null}
                    />
                  <select 
                    name={input.name} 
                    className='selectStyle'
                    value={resto2[input.name] ?? ''} 
                    onChange={onInputChange2}
                  >
                    <option value='' hidden>chose a item</option>
                    <option value="integer">integer</option>
                    <option value="boolean">boolean</option>
                    <option value="numeric">numeric</option>
                    <option value="float">float</option>
                    <option value="double precision">double precision</option>
                    <option value="character varying">character varying</option>
                    <option value="date">date</option>
                    <option value="text">text</option>
                    <option value="varchar">varchar</option>
                  </select>  
              </div>
              ))
            }
          </form>
        )
    }
    </>
  )
}


