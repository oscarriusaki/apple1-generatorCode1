import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Navbar = () => {

  const { inputForm, component, onInputChange} = useForm({
    component: '',
  })
  const onInputSubmit = (value) => {
    value.preventDefault();
  }
  const [active, setActive] = useState(false);
  const [activeApple2, setActiveApple2] = useState(localStorage.getItem('apple2') || '');

  const handleClick = () => {
    setActive(true);
  }
  const handleRelease = () => {
    setActive(false);
  }
  const activarApple2 = (value) => {
    localStorage.setItem('apple2', value);
    setActiveApple2(value)
  }  
  return (
    <>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark barraApple3'>    
      <Link className="navbar-brand" to={'/'}><FontAwesomeIcon icon={faAppleAlt} /> 
      <span className='textoApple'>Apple</span></Link>
      <div className='navRow'>
        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active navItem': 'navItem'}`}
          to={'/'} onClick={() => activarApple2('apple1')}>
          apple1
        </NavLink>
        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active navItem': 'navItem'}`}
          to={'/apple2'} onClick={() => activarApple2('apple2')}>
          apple2
        </NavLink>
        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active navItem': 'navItem'}`}
          to={'/apple3'} onClick={() => activarApple2('apple3')}
        >
          apple3
        </NavLink>
        <NavLink className={({isActive}) => `nav-link ${isActive ? 'active navItem': 'navItem'}`}
          to={'/borrador'} onClick={() => activarApple2('borrador')}>
          Borrador
        </NavLink>
      </div>
      {
        activeApple2 && (
          <div className='formCentral'>
            <form onSubmit={onInputSubmit} >
              <input 
                type="text" 
                className='inputCode'
                placeholder='search a component'
                name="component" 
                autoComplete='off'
                value={component.replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')}
                onChange={onInputChange}
                />
                <button 
                  className={`${active? 'btnCode' : 'btnCode2'} `}
                  onMouseDown={handleClick}
                  onMouseUp={handleRelease}
                  onTouchStart={handleClick} /* estas propiedades son para pantallas tactiles */
                  onTouchEnd={handleRelease} /* estas propiedades son para pantallas tactiles */
                  >search</button>
            </form>
          </div>
        )
      }
    </nav>
  </>
  )
}
