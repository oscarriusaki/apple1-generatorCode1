import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useTable } from 'react-table';

export const Apple2 = () => {

  const { inputForm, component, onInputChange} = useForm({
    component: '',
  })
  const onInputSubmit = (value) => {
    value.preventDefault();
  }
  const [active, setActive] = useState(false);
  const [items, setItems] = useState({
    footer: false,
  })
  const handleClick = () => {
    setActive(true);
  }
  const handleRelease = () => {
    setActive(false);
  }

  const data = [
                  {'id': 1, 'nombre': 'oscar',     'correo': 'oscar1@gmail.com',      'fecha': '1996/05/03', 'phone': '12346547'},    
                  {'id': 2, 'nombre': 'maria',     'correo': 'maria2@gmail.com',      'fecha': '1986/06/04', 'phone': '12346548'},    
                  {'id': 3, 'nombre': 'ester',     'correo': 'ester3@gmail.com',      'fecha': '1964/07/08', 'phone': '12346549'},    
                  {'id': 4, 'nombre': 'juan',      'correo': 'juan4@gmail.com',       'fecha': '2026/01/07', 'phone': '12346550'},     
                  {'id': 5, 'nombre': 'marcos',    'correo': 'marcos5@gmail.com',     'fecha': '2023/02/06', 'phone': '12346551'},
                  {'id': 6, 'nombre': 'pedro',     'correo': 'pedro6@gmail.com',      'fecha': '2024/03/08', 'phone': '12346552'},
                  {'id': 7, 'nombre': 'roberto',   'correo': 'roberto7@gmail.com',    'fecha': '2026/04/09', 'phone': '12346553'},
                  {'id': 8, 'nombre': 'pedrito',   'correo': 'pedrito8@gmail.com',    'fecha': '2028/05/10', 'phone': '12346554'},
                  {'id': 9, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com',  'fecha': '2028/06/11', 'phone': '12346555'},
                  {'id': 10, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556'},
                  {'id': 11, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557'},
                  {'id': 12, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558'},
                  {'id': 13, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559'},
                  {'id': 14, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560'},
                  {'id': 15, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561'},
                  {'id': 16, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562'},
                  {'id': 17, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563'},
                ];
  
  const columns = React.useMemo(() => [ 
      {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Nombre',
        Footer: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Correo',
        Footer: 'Correo',
        accessor: 'correo',
      },
      {
        Header: 'Fecha',
        Footer: 'Fecha',
        accessor: 'fecha',
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
      },

  ],[]);

  const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        footerGroups,
        rows, 
        prepareRow,
      } = useTable({columns, data});

  const agregarFooter = (value) => {
    setItems({
      ...items,
      footer:!value
    });
    console.log(items.footer)
  }
  return (
    <>
      <div className='position-relative'>
      <nav className='barraApple2'>    
         
      <div className='formCentralItems'>
        <form onSubmit={onInputSubmit} >
          <input 
            type="checkbox" 
            checked={items.footer}
            onChange={() => agregarFooter(items.footer)}
            />
            <span style={{paddingLeft: '4px'}}>agregar footer</span>
        </form>
      </div>
    </nav>
        <div className='texto-posicionado'>
          <table {...getTableProps()} className='table-bordered'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>  
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) =>(
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
            {
              (items.footer)&&(
                <tfoot>
                  {footerGroups.map((footerGroup, index) => (
                    <tr key={index} {...footerGroup.getFooterGroupProps()}>
                      {
                        footerGroup.headers.map((column, index) => (
                          <td key={index} {...column.getFooterProps}>
                            {
                              column.render('Footer')
                            }
                          </td>
                        ))
                      }
                    </tr>
                  ))}
                </tfoot>
              )
            }
          </table>  
        </div> 
      </div>
    </>
  )
}
