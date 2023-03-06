import { faCode, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { DataBaseDelete, 
          DataBaseGet, 
          DataBaseGets, 
          DataBasePost, 
          DataBasePut, 
          NodejsControllers, 
          NodejsRouter } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import { GeneradorTextoCodigo } from '../../ui/GeneradorTextoCodigo';
import { Navbar } from '../../ui/components';

export const Apple1 = () => {
 
  const [inputs, setInputs] = useState([])
  const [count, setCount] = useState(1);
  const [map, setMap] = useState({
    active: false,
    nombreTabla: ''
  });
  const [map2, setMap2] = useState({})

  const { nombreTabla, active, onInputChange,onInputChange3, activeCode, onReset, ...resto } = useForm(map);
  const { onInputChange2 ,...resto2 } = useForm(map2);
  
  let nombreFuncionOriginal = nombreTabla.split(' ');
  nombreFuncionOriginal = nombreFuncionOriginal.map(resp => {
      return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
  })
  nombreFuncionOriginal = nombreFuncionOriginal.join('');
   
  const { nodejsControllers } = NodejsControllers(resto, nombreTabla, resto2);
  const { nodejsRouter } = NodejsRouter(resto, nombreTabla, resto2);
  const { dataBaseGet } = DataBaseGet(resto, nombreTabla, resto2);
  const { dataBaseGets } = DataBaseGets(resto, nombreTabla, resto2);
  const { dataBasePost } = DataBasePost(resto, nombreTabla, resto2);
  const { dataBasePut } = DataBasePut(resto, nombreTabla, resto2);
  const { dataBaseDelete } = DataBaseDelete(resto, nombreTabla, resto2);

  const ref2 = useRef();
  const ref4 = useRef();
  const [showError, setShowError] = useState(false);

  const onInputSubmit = (value) => {
    value.preventDefault();
 
    if(nombreTabla.trim().length < 1 || 
      ((Object.keys( resto.inputForm).length - 2) != Object.keys( resto2.inputForm).length) ||
      (Object.keys( resto.inputForm).length - 2) === 0 ||
      (Object.keys( resto2.inputForm).length ) === 0
      ){
      ref4.current.focus();
      setShowError(true)
      return;
    }
    
    setShowError(false)
    activeCode(true)
    
  } 

  const clear = () => { 
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
    window.location.reload();
  } 

  useEffect(() => {
    setShowError(false)
  }, [resto2.inputForm, resto.inputForm, nombreTabla])
  
  const addColumn = () => {
    setShowError(false)
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
   
    return () => {
      document.removeEventListener('keydown', handleKeyDowm)
    }
  }, [ addColumn ]);

  useEffect(() => {
    const handlekeyDowm = (event) =>{
      if(event.key === 'Enter' && ref2.current){
          onInputSubmit(event); 
      }
    }
    document.addEventListener('keydown', handlekeyDowm);
    return () => {
      document.removeEventListener('keydown', handlekeyDowm);
    }
  }, [onInputSubmit]);
   
  return (
    <>
    <div className='cuerpoBoton2'>  
        <form onSubmit={onInputSubmit} autoComplete='off' className='cuerpoBoton' ref={ref2}>
          <input 
              type='text' 
              className='inputStyle'
              placeholder='Nombre de la tabla separado'
              name='nombreTabla'
              value={nombreTabla || resto.inputForm.nombreTabla}
              onChange={onInputChange}
              ref={ref4}
            /> 

          <button type='submit' className='botonGenerateStyle' >
            <FontAwesomeIcon icon={faCode} />
            <span style={{paddingLeft:'2%'}}>&#40; Enter &#41;</span> 
          </button>
        </form>
      <button type='submit' className='botonAddColumnStyle' onClick={addColumn}>
        <FontAwesomeIcon icon={faPlus} />
        <span style={{paddingLeft:'2%'}} >&#40; ctrl + . &#41;</span> 
      </button> 
      <button type='submit' className='botonClearStyle' onClick={clear} disabled={!active && count < 0}>
        <FontAwesomeIcon icon={faTrashCan} /> 
        <span style={{paddingLeft:'2%'}}> &#40; ctrl + backspace &#41;</span> 
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
      : ( ((inputs.length )< 1) && 
          (
          <>
            {/* <p className='MensajeInsert'>Insert column to generate code...</p> */}
          </>
          )
        )
    }

    {
      (!active) && 
        (
          (count > 0) &&
          <form autoComplete='off' className='tabla'>
            {
              inputs.map((input, index) => (
                <div key={input.id}> 
                  <input   
                    type={'text'} 
                    placeholder={`Column ${input.id}`}
                    className='inputStyleTabla'
                    name={input.name} 
                    value={resto[input.name] ?? '' } 
                    onChange={onInputChange}  
                    required
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
    {showError &&  <p className='MensajeError'>Please complete the form</p>}
    {
      (!active) && (
        <div className='mensaje'>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota1:</span>  Tablas con sintaxis obligatoria en caso de necesitar alguna de estas propiedades "ID_NOMBRE_LA_TABLA", "CORREO_NOMBRE_DE_LA_TABLA", "EMAIL_NOMBRE_DE_LA_TABLA" , "PASSWORD_NOMBRE_LA_TABLA", "PAS_NOMBRE_DE_LA_TABLA", "CONTRASENA_NOMBRETABLA"</p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota2:</span>  Tablas especiales con nombre de la tabla "USER","USUARIO","EMPLOYEE","EMPLEADO","ADMINISTRATOR","ADMINISTRADOR", son tablas especiales que tiene token y encriptacion de password</p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota3:</span>  Las TABLAS tienen que tener una columna "ESTADOELIMINAR" para que tenga un estado de eliminado </p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota4:</span>  Una tabla si necesita un correo o password es obligatorio queempieze con esa sintaxis nota1 si tiene mas parametros relacionado con el correo o password se debe poner de una sintaxis diferente a la nota1</p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota5:</span>  tabla "USER","USUARIO","EMPLOYEE","EMPLEADO","ADMINISTRATOR","ADMINISTRADOR", el token que se genera automaticamente siempre sera el ultimo parametro automatico ya puesto en el codigo</p>
        </div>
      )
    }
    </>
  )
}