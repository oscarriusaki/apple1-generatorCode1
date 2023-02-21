import { faCode, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
 
  const inputs = [];
  const [count, setCount] = useState(1);
  const [map, setMap] = useState({
    columna1: '',
    columna2: '',
    active: false
  });
  for( let i = 1; i< count; i++){
    inputs.push(
        <input  key={i} 
                type={'text'} 
                placeholder={`Column ${i}`}
                className='inputStyleTabla'
                />
    );
  }

  const { columna1, columna2, active, onInputChange, inputForm, activeCode, onReset } = useForm(map);

  var columna11 = '';
  var columna22 = '';
  if(localStorage.getItem('columna1') && localStorage.getItem('columna2')){
    columna11 =localStorage.getItem('columna1').trim() || '';
    columna22 =localStorage.getItem('columna2').trim() || '';
  } 
  const { nodejsControllers } = NodejsControllers(columna1.trim() || columna11, columna2.trim() || columna22);
  const { nodejsRouter } = NodejsRouter(columna1.trim() || columna11, columna2.trim() || columna22);
  const { dataBaseDelete } = DataBaseDelete(columna1.trim() || columna11, columna2.trim() || columna22);
  const { dataBaseGet } = DataBaseGet(columna1.trim() || columna11, columna2.trim() || columna22);
  const { dataBaseGets } = DataBaseGets(columna1.trim() || columna11, columna2.trim() || columna22);
  const { dataBasePost } = DataBasePost(columna1.trim() || columna11, columna2.trim() || columna22);
  const { dataBasePut } = DataBasePut(columna1.trim() || columna11, columna2.trim() || columna22);
  
  const navigate = useNavigate()
  const ref1 = useRef();
  const ref2 = useRef();
  
  const onInputSubmit = (value) => {
    value.preventDefault(); 
    if((!value.target.columna1.value.trim().length || !value.target.columna2.value.trim().length) && 
        (localStorage.getItem('columna1').trim().length < 1 || localStorage.getItem('columna2').trim().length < 1) ){
      activeCode(false)
      return;
    } 
    navigate(`?v1=${columna1 .trim() || columna11}&v2=${columna2 .trim() || columna22}`,{
      replace: true
    }) 
    
    localStorage.setItem('columna1', columna1.trim() || columna11);
    localStorage.setItem('columna2', columna2.trim() || columna22);
 
    activeCode(true)
  } 
  const clear = () => {
    localStorage.clear();
    ref1.current.value='';
    ref2.current.value='';
    ref1.current.focus();
    setCount(0);
    inputs.splice(0, inputs.length)
    onReset()
  }  
  useEffect(() => {
    localStorage.setItem('columna1', columna1 || columna11)
  }, [columna1])
  useEffect(() => {
    localStorage.setItem('columna2', columna2 || columna22)
  }, [columna2])
  
  const addColumn = () => {
    setCount(count+1);
    console.log(count,'contador')
    setMap({
      ...map,
      [`columna${count}`] : `data${count}`
    })
    console.log(map,'columnas') 
    activeCode(false)
  }

  return (
    <>
    <div className='cuerpoBoton2'>  
      <form onSubmit={onInputSubmit} autoComplete='off' className='cuerpoBoton'>
        <input 
          type='text' 
          className='inputStyle'
          placeholder='Columna 1'
          name='columna1'
          value={columna1||columna11}
          onChange={onInputChange}
          ref={ref1}
        /> 
        <input 
          type='text'
          className='inputStyle'
          placeholder='Columna 2'
          name='columna2'
          value={columna2||columna22}
          onChange={onInputChange}
          ref={ref2}
          /> 
        <button type='submit' className='botonGenerateStyle'>
          <FontAwesomeIcon icon={faCode} />
          <span style={{paddingLeft:'2%'}}>Generate</span> 
        </button>
      </form>
      <button type='submit' className='botonAddColumnStyle' onClick={addColumn}>
        <FontAwesomeIcon icon={faCode} />
        <span style={{paddingLeft:'2%'}}>Add column</span> 
      </button> 
      <button type='submit' className='botonClearStyle' onClick={clear} disabled={!active && count < 0}>
        <FontAwesomeIcon icon={faTrashCan} /> 
        <span style={{paddingLeft:'2%'}}>Clear</span> 
      </button>
    </div>
    {
      (active ) 
      ? (<>
          <GeneradorTextoCodigo code={nodejsRouter} textClass={`${(columna1 || columna11).trim().charAt(0).toUpperCase() + (columna1 || columna11).trim().slice(1).toLowerCase() + (columna2 || columna22).trim().charAt(0).toUpperCase() + (columna2 || columna22).trim().slice(1).toLowerCase()}.js`} typeFile={'Nodejs / Router'} />
          <GeneradorTextoCodigo code={nodejsControllers} textClass={`${(columna1 || columna11).trim().charAt(0).toUpperCase() + (columna1||columna11).trim().slice(1).toLowerCase() + (columna2||columna22).trim().charAt(0).toUpperCase() + (columna2||columna22).trim().slice(1).toLowerCase()}.js`} typeFile={'Nodejs / Controller'} />
          <GeneradorTextoCodigo code={dataBaseGet} textClass={`fn_get${(columna1 || columna11).trim().charAt(0).toUpperCase() + (columna1 || columna11).trim().slice(1).toLowerCase() + (columna2 || columna22).trim().charAt(0).toUpperCase() + (columna2 || columna22).trim().slice(1).toLowerCase()}`} typeFile={'Database / Get'} />
          <GeneradorTextoCodigo code={dataBaseGets} textClass={`fn_gets${(columna1 || columna11).trim().charAt(0).toUpperCase() + (columna1 || columna11).trim().slice(1).toLowerCase() + (columna2 || columna22).trim().charAt(0).toUpperCase() + (columna2 || columna22).trim().slice(1).toLowerCase()}`} typeFile={'Database / Get / id'} />
          <GeneradorTextoCodigo code={dataBasePost} textClass={`fn_post${(columna1 || columna11).trim().charAt(0).toUpperCase() + (columna1 || columna11).trim().slice(1).toLowerCase() + (columna2 || columna22).trim().charAt(0).toUpperCase() + (columna2 || columna22).trim().slice(1).toLowerCase()}`} typeFile={'Database / Post'} />
          <GeneradorTextoCodigo code={dataBasePut} textClass={`fn_put${(columna1 || columna11).trim().charAt(0).toUpperCase() + (columna1 || columna11).trim().slice(1).toLowerCase() + (columna2 || columna22).trim().charAt(0).toUpperCase() + (columna2 || columna22).trim().slice(1).toLowerCase()}`} typeFile={'Database / Pust'} />
          <GeneradorTextoCodigo code={dataBaseDelete} textClass={`fn_delete${(columna1 || columna11).trim().charAt(0).toUpperCase() + (columna1 || columna11).trim().slice(1).toLowerCase() + (columna2 || columna22).trim().charAt(0).toUpperCase() + (columna2 || columna22).trim().slice(1).toLowerCase()}`} typeFile={'Database / Delete'} />
        </>
      )
      : <p className='MensajeInsert'>Insert column to generate code...</p>
    }
    {
    (count >= 0) &&
    <form autoComplete='off' className='tabla'>
      {inputs}
    </form>
    }
    </>
  )
}


