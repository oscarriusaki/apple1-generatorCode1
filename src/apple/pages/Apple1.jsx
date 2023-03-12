import { faCode, faPlus, faTable, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { CreateTable, DataBaseDelete, 
          DataBaseGet, 
          DataBaseGets, 
          DataBasePost, 
          DataBasePut, 
          NodejsControllers, 
          NodejsRouter } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import { GeneradorTextoCodigo } from '../../ui/GeneradorTextoCodigo';

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
  let nombreFuncionOriginal = nombreTabla.trim().replace(/[\s_]+/g, ' ').split(' '); /* replace(/[\s_]+/g, ' ') sirve para quitar espacios entre palabras y quita guiones bajos y remplaza con un espacio */
  nombreFuncionOriginal = nombreFuncionOriginal.map(resp => {
      return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
  })
  nombreFuncionOriginal = nombreFuncionOriginal.join('');
  let nombreTableCreate = nombreTabla.trim().replace(/[\s_]+/g, ' ').split(' ');
  nombreTableCreate = nombreTableCreate.map(resp => {
    return resp.toLowerCase();
  })
  nombreTableCreate = nombreTableCreate.join('_');
   
  const { nodejsControllers } = NodejsControllers(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);
  const { nodejsRouter } = NodejsRouter(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);
  const { dataBaseGet } = DataBaseGet(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);
  const { dataBaseGets } = DataBaseGets(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);
  const { dataBasePost } = DataBasePost(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);
  const { dataBasePut } = DataBasePut(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);
  const { dataBaseDelete } = DataBaseDelete(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);
  const { createTable } = CreateTable(resto, nombreTabla.replace(/[\s_]+/g, ' '), resto2);

  const ref2 = useRef();
  const ref4 = useRef();
  const [showError, setShowError] = useState(false);

  const onInputSubmit = (value) => {
    value.preventDefault();
 
    if(nombreTabla.trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').length < 1 || 
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

  const showTable = () => {
    setShowError(false)
    activeCode(false)
  }

  const clear = () => { 
    setInputs([])
    setCount(1)
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
    const handleKeyDowm  = (event) => {
      if(event.ctrlKey && event.key === ','){
        showTable();
      }
    }
    document.addEventListener('keydown', handleKeyDowm);
   
    return () => {
      document.removeEventListener('keydown', handleKeyDowm)
    }
  }, [ showTable ]);

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
              placeholder='Nombre de cada tabla separado sin guion "_"'
              name='nombreTabla'
              value={nombreTabla.replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') || resto.inputForm.nombreTabla.replace(/[^a-zA-Z0-9_ ]/g, '')}
              onChange={onInputChange}
              ref={ref4}
            /> 

          <button type='submit' className='botonGenerateStyle' >
            <FontAwesomeIcon icon={faCode} />
            <span style={{paddingLeft:'2%'}}>&#40; Enter &#41;</span> 
          </button>
        </form>
      <button type='submit' className='botonShowTable' onClick={showTable}>
        <FontAwesomeIcon icon={faTable} />
        <span style={{paddingLeft:'2%'}} >&#40; ctrl + , &#41;</span> 
      </button> 
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
          <GeneradorTextoCodigo code={createTable} textClass={`${nombreTableCreate}`} typeFile={'Database / postgres / create table'} dateType={'postgres'} />
          <GeneradorTextoCodigo code={nodejsRouter} textClass={`${nombreFuncionOriginal}.js`} typeFile={'Nodejs / javascript / router'} dateType={'javascript'} />
          <GeneradorTextoCodigo code={nodejsControllers} textClass={`${nombreFuncionOriginal}.js`} typeFile={'Nodejs / javascript / controller'} dateType={'javascript'} />
          <GeneradorTextoCodigo code={dataBaseGet} textClass={`fn_get${nombreFuncionOriginal}`} typeFile={'Database / postgres / get / id'} dateType={'postgres'} />
          <GeneradorTextoCodigo code={dataBaseGets} textClass={`fn_get${nombreFuncionOriginal}s`} typeFile={'Database / postgres / get'} dateType={'postgres'} />
          <GeneradorTextoCodigo code={dataBasePost} textClass={`fn_post${nombreFuncionOriginal}`} typeFile={'Database / postgres / post'} dateType={'postgres'} />
          <GeneradorTextoCodigo code={dataBasePut} textClass={`fn_put${nombreFuncionOriginal}`} typeFile={'Database / postgres / put'} dateType={'postgres'} />
          <GeneradorTextoCodigo code={dataBaseDelete} textClass={`fn_delete${nombreFuncionOriginal}`} typeFile={'Database / postgres / delete'} dateType={'postgres'} />
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
                    <option value="varchar">varchar &#40;255&#41;</option>
                    <option value="boolean">boolean</option>
                    <option value="numeric">numeric</option>
                    <option value="timestamp">timestamp</option>
                    <option value="text">text</option>
                    <option value="float">float</option>
                    <option value="date">date</option>
                    <option value="character varying">character varying</option>
                    <option value="double precision">double precision</option>
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
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota1:</span>  Tablas con sintaxis obligatoria en caso de necesitar alguna de estas propiedades "ID_NOMBRE_LA_TABLA", "CORREO_NOMBRE_DE_LA_TABLA", "EMAIL_NOMBRE_DE_LA_TABLA" , "PASSWORD_NOMBRE_LA_TABLA", "PAS_NOMBRE_DE_LA_TABLA", "CONTRASENA_NOMBRETABLA".</p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota2:</span>  Tabla "USER","USUARIO","EMPLOYEE","EMPLEADO","ADMINISTRATOR","ADMINISTRADOR", hacen login, tiene encriptacion de contrasena , el token que se genera automaticamente siempre sera el ultimo parametro automatico ya puesto en el codigo, si necesita que una tabla diferente que tenga login y encriptacion, entonces modificar en el codigo "APPLE1" para generarlo e incluir en las restricciones de las tablas permitidas.</p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota3:</span>  Las TABLAS tienen que tener una columna "ESTADOELIMINAR" para que tenga un estado de eliminado y poner NOW() en la columna "fechacre" cuando se actualice una tabla.</p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota4:</span>  Generar llaves PRIMARIAS "ID_NOMBRE_TABLA_ACTUAL" y llaves FORNEAS poner "ID_NOMBRE_OTRA_TABLA, no poner "ID_" para ningun otra columna que no tenga que ver con un ID de una tabla. </p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota5:</span>  Generar la restriccion UNIQUE solo para correo poner "CORREO_NOMBRE_TABLA" o para "EMAIL_NOMBRE_TABLA" o "CORREO" o "EMAIL" solo para tablas en el NOTA 2.</p>
          <p className='tarejetaMensaje'> <span className='notaStyle'>Nota6:</span>  Todos los campos de entrada son zanitizadas en el APPLE1 y los unicos caracteres permitidos son numeros, letras mayusculas y minusculas tambien los caracteres especiales permitidos son: _ $#@~%[  si desea agregar mas caracter modificar en el .replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')  en todos los archivos que usa apple1</p>
        </div>
      )
    }
    </>
  )
}