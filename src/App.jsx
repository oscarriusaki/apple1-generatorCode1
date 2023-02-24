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

  for( let i = 1; i< count; i++){
    inputs.push(
      <div key={i}>
        <input   
          type={'text'} 
          placeholder={`Column ${i}`}
          className='inputStyleTabla'
          name={`columna${i}`}
          id={`input-${i}`}
          value={resto[`columna${i}`] ?? ''} 
          onChange={onInputChange}
          
          />
        <select 
          name={`columna${i}`}
          id={`input-${i}`}
          className='selectStyle'
          value={resto2[`columna${i}`] ?? ''} 
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
    );
  } 
  const { nodejsControllers } = NodejsControllers(resto, nombreTabla, resto2);
  const { nodejsRouter } = NodejsRouter(resto, nombreTabla, resto2);
  const { dataBaseGet } = DataBaseGet(resto, nombreTabla, resto2);
  const { dataBaseGets } = DataBaseGets(resto, nombreTabla, resto2);
  const { dataBasePost } = DataBasePost(resto, nombreTabla, resto2);
  const { dataBasePut } = DataBasePut(resto, nombreTabla, resto2);
  const { dataBaseDelete } = DataBaseDelete(resto, nombreTabla, resto2);

  const navigate = useNavigate()
  const ref1 = useRef();
  const ref2 = useRef();
  
  const onInputSubmit = (value) => {
    value.preventDefault(); 
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
  const addColumn = () => {
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
 
  return (
    <>
    <div className='cuerpoBoton2'>  
      <form onSubmit={onInputSubmit} autoComplete='off' className='cuerpoBoton'>
        <input 
            type='text' 
            className='inputStyle'
            placeholder='Nombre de la tabla separado'
            name='nombreTabla'
            value={nombreTabla}
            onChange={onInputChange}
            ref={ref1}
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
          (count >= 0) &&
          <form autoComplete='off' className='tabla'>
            {inputs}
          </form>
        )
    }
    </>
  )
}


