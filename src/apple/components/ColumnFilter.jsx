import React from 'react'

export const ColumnFilter = ({column}) => {

  const { filterValue, setFilter } = column;

  return (
      <span>
          {/* Search: {''} */}
          <input 
              // type="text" 
              // name="" 
              className='inputBusquedaTabla'
              placeholder={column.id}
              value={ filterValue ?? '' }
              onChange = {(e) => setFilter(e.target.value)}
          />
      </span>
  )
}