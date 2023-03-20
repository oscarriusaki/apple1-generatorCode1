import { faCode, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { GeneradorTextoCodigo } from '../../ui/GeneradorTextoCodigo';
import { ColumnFilter } from './ColumnFilter';
import ReactPaginate from 'react-paginate';
import { CheckBox } from './CheckBox';

export const Apple2 = () => {
 
  const onInputSubmit = (value) => {
    value.preventDefault();
  } 

  const [items, setItems] = useState({
    footer: false,
    activeOptionGroupColumn: false,
    groupColumns: false,
    generarCode: false,
    ordenarColumna: false,
    busquedaGeneral: false,
    busquedaPorColumna: false,
    paginacion: false,
    paginacion2: false,
    marcaFila: false,
  });
  
  const data = useMemo(() => [
    {'id': 1, 'nombre': 'oscar',     'correo': 'oscar1@gmail.com',      'fecha': '1996/05/03', 'phone': '12346547', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 2, 'nombre': 'maria',     'correo': 'maria2@gmail.com',      'fecha': '1986/06/04', 'phone': '12346548', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 3, 'nombre': 'ester',     'correo': 'ester3@gmail.com',      'fecha': '1964/07/08', 'phone': '12346549', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 4, 'nombre': 'juan',      'correo': 'juan4@gmail.com',       'fecha': '2026/01/07', 'phone': '12346550', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 5, 'nombre': 'marcos',    'correo': 'marcos5@gmail.com',     'fecha': '2023/02/06', 'phone': '12346551', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 6, 'nombre': 'pedro',     'correo': 'pedro6@gmail.com',      'fecha': '2024/03/08', 'phone': '12346552', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 7, 'nombre': 'roberto',   'correo': 'roberto7@gmail.com',    'fecha': '2026/04/09', 'phone': '12346553', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 8, 'nombre': 'pedrito',   'correo': 'pedrito8@gmail.com',    'fecha': '2028/05/10', 'phone': '12346554', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 9, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com',  'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 10, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 11, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 12, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 13, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 14, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 15, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 16, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 17, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 18, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com', 'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 19, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 20, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 21, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 22, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 23, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 24, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 25, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 26, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 27, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 28, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 29, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 30, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 31, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 32, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 33, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 34, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 35, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 36, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 37, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 38, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 39, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 40, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 41, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 42, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 43, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 44, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 45, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 46, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 47, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 48, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 49, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 40, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 51, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 52, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 53, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 54, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 55, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 56, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 57, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 58, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 59, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 60, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 71, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 72, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 73, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 74, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 75, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 76, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 77, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 78, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 79, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 70, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 81, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 82, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 83, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 84, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 85, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 86, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 87, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 88, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 89, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 80, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 91, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 92, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 93, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 94, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 95, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 96, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 97, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 98, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 99, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 100, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 101, 'nombre': 'oscar',     'correo': 'oscar1@gmail.com',      'fecha': '1996/05/03', 'phone': '12346547', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 102, 'nombre': 'maria',     'correo': 'maria2@gmail.com',      'fecha': '1986/06/04', 'phone': '12346548', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 103, 'nombre': 'ester',     'correo': 'ester3@gmail.com',      'fecha': '1964/07/08', 'phone': '12346549', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 104, 'nombre': 'juan',      'correo': 'juan4@gmail.com',       'fecha': '2026/01/07', 'phone': '12346550', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 105, 'nombre': 'marcos',    'correo': 'marcos5@gmail.com',     'fecha': '2023/02/06', 'phone': '12346551', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 106, 'nombre': 'pedro',     'correo': 'pedro6@gmail.com',      'fecha': '2024/03/08', 'phone': '12346552', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 107, 'nombre': 'roberto',   'correo': 'roberto7@gmail.com',    'fecha': '2026/04/09', 'phone': '12346553', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 108, 'nombre': 'pedrito',   'correo': 'pedrito8@gmail.com',    'fecha': '2028/05/10', 'phone': '12346554', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 109, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com',  'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 110, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 111, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 112, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 113, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 114, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 115, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 116, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 117, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 118, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com',  'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 119, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 120, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 121, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 122, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 123, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 124, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 125, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 126, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 127, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 128, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 129, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 130, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 131, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 132, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 133, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 134, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 135, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 136, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 137, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 138, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 139, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 140, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 141, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 142, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 143, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 144, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 145, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 146, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 147, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 148, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 149, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 140, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 151, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 152, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 153, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 154, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 155, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 156, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 157, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 158, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 159, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 160, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 171, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 172, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 173, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 174, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 175, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 176, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 177, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 178, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 179, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 170, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 181, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 182, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 183, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 184, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 185, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 186, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 187, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 188, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 189, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 180, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 191, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 192, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 193, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 194, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 195, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 196, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 197, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 198, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 199, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    {'id': 200, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
  ] ,[]) ;
  
  const columns2 = React.useMemo(() => [ 
      {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
        Filter: ColumnFilter
      },
      {
        Header: 'Nombre',
        Footer: 'Nombre',
        accessor: 'nombre',
        Filter: ColumnFilter
      },
      {
        Header: 'Correo',
        Footer: 'Correo',
        accessor: 'correo',
        Filter: ColumnFilter
      },
      {
        Header: 'Fecha',
        Footer: 'Fecha',
        accessor: 'fecha',
        Filter: ColumnFilter
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
        Filter: ColumnFilter
      },
      {
        Header: 'Image',
        Footer: 'Image',
        accessor: 'image',
        Filter: ColumnFilter,
        Cell: ({cell: { value } }) => <img width={'50px'} height={'50px'} src={value} alt="Avatar" />
      },
      {
        Header: 'img',
        Footer: 'img',
        accessor: 'img',
        Filter: ColumnFilter,
        Cell: ({cell: { value } }) => (
          <>
            <img src={value} alt="Avatar" />
            <img src={value} alt="Avatar" />
            <img src={value} alt="Avatar" />
            <button>Submit</button>
          </>
          )
      },
  ],[]);
 
  const GROUPED_COLUMNS = [
    {
      Header: 'ID', 
      Footer: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      Footer: 'Name',
      columns: [
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
      ],
    },
    {
      Header: 'Info',
      Footer: 'Info',
      columns: [
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
      ],
    }
  ];

  const columns = useMemo(() => (items.groupColumns ? GROUPED_COLUMNS : columns2), [items.groupColumns])

  const agregarFooter = (value) => {
    setItems({
      ...items,
      footer:!value
    });
  }

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    footerGroups,
    rows, 
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    selectedFlatRows
  } = useTable(
  {
    columns, 
    data, 
    /* pones esta linea solo si quieres que la tabla salte a una pagina especifica */
    // initialState: {pageIndex : 1}
  },
  useFilters,
  useGlobalFilter, 
  useSortBy,
  usePagination,
  useRowSelect,
  (items.marcaFila) ? (
  (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
        {
          id: 'selection',
          Header: ({getToggleAllRowsSelectedProps}) => (
            <CheckBox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({row}) => (
            <CheckBox {...row.getToggleRowSelectedProps()} />
          )
        },
        ...columns
      ]
    })
  }
  ): ('')
  );

  const marcarFila = (value) => {
    setItems({
      ...items,
      marcaFila: !value,
    })
    console.log(items.marcaFila);
  }

  const { globalFilter, pageIndex, pageSize } = state;

  const generarCode = () => {
    setItems({
      ...items,
      generarCode: !items.generarCode
    })
  }

  const footerTable = 
  (<tfoot>
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
  </tfoot>);
let code = 
`/*  */

  /* Instalation Yarn: yarn add react-table */
  /* Instalation Yarn: yarn add react-paginate*/

  /*  */

  import React, { useEffect, useMemo, useState } from 'react';
  import { useFilters, useGlobalFilter, usePagination, ${(items.marcaFila) ? (`useRowSelect, `) : (``)}useSortBy,useTable } from 'react-table';
  import { ColumnFilter } from './ColumnFilter';
  ${ (items.paginacion || items.paginacion2) ? (`import ReactPaginate from 'react-paginate';`):(``) }
  ${ (items.marcaFila) ? (`import { CheckBox } from './CheckBox';`):(``) }

  export const Borrador = () => {

    const data = useMemo(() => [
      {'id': 1, 'nombre': 'oscar',     'correo': 'oscar1@gmail.com',      'fecha': '1996/05/03', 'phone': '12346547', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 2, 'nombre': 'maria',     'correo': 'maria2@gmail.com',      'fecha': '1986/06/04', 'phone': '12346548', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 3, 'nombre': 'ester',     'correo': 'ester3@gmail.com',      'fecha': '1964/07/08', 'phone': '12346549', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 4, 'nombre': 'juan',      'correo': 'juan4@gmail.com',       'fecha': '2026/01/07', 'phone': '12346550', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 5, 'nombre': 'marcos',    'correo': 'marcos5@gmail.com',     'fecha': '2023/02/06', 'phone': '12346551', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 6, 'nombre': 'pedro',     'correo': 'pedro6@gmail.com',      'fecha': '2024/03/08', 'phone': '12346552', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 7, 'nombre': 'roberto',   'correo': 'roberto7@gmail.com',    'fecha': '2026/04/09', 'phone': '12346553', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 8, 'nombre': 'pedrito',   'correo': 'pedrito8@gmail.com',    'fecha': '2028/05/10', 'phone': '12346554', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 9, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com',  'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 10, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 11, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 12, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 13, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 14, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 15, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 16, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 17, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 18, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com', 'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 19, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 20, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 21, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 22, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 23, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 24, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 25, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 26, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 27, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 28, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 29, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 30, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 31, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 32, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 33, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 34, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 35, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 36, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 37, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 38, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 39, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 40, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 41, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 42, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 43, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 44, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 45, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 46, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 47, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 48, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 49, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 40, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 51, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 52, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 53, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 54, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 55, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 56, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 57, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 58, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 59, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 60, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 71, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 72, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 73, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 74, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 75, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 76, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 77, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 78, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 79, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 70, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 81, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 82, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 83, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 84, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 85, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 86, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 87, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 88, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 89, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 80, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 91, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 92, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 93, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 94, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 95, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 96, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 97, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 98, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 99, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 100, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 101, 'nombre': 'oscar',     'correo': 'oscar1@gmail.com',      'fecha': '1996/05/03', 'phone': '12346547', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 102, 'nombre': 'maria',     'correo': 'maria2@gmail.com',      'fecha': '1986/06/04', 'phone': '12346548', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 103, 'nombre': 'ester',     'correo': 'ester3@gmail.com',      'fecha': '1964/07/08', 'phone': '12346549', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 104, 'nombre': 'juan',      'correo': 'juan4@gmail.com',       'fecha': '2026/01/07', 'phone': '12346550', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 105, 'nombre': 'marcos',    'correo': 'marcos5@gmail.com',     'fecha': '2023/02/06', 'phone': '12346551', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 106, 'nombre': 'pedro',     'correo': 'pedro6@gmail.com',      'fecha': '2024/03/08', 'phone': '12346552', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 107, 'nombre': 'roberto',   'correo': 'roberto7@gmail.com',    'fecha': '2026/04/09', 'phone': '12346553', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 108, 'nombre': 'pedrito',   'correo': 'pedrito8@gmail.com',    'fecha': '2028/05/10', 'phone': '12346554', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 109, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com',  'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 110, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 111, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 112, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 113, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 114, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 115, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 116, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 117, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 118, 'nombre': 'orostiaga', 'correo': 'orostiaga9@gmail.com',  'fecha': '2028/06/11', 'phone': '12346555', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 119, 'nombre': 'estefany', 'correo': 'estefany10@gmail.com',  'fecha': '2020/07/12', 'phone': '12346556', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 120, 'nombre': 'tatiana',  'correo': 'tatiana11@gmail.com',   'fecha': '2027/08/13', 'phone': '12346557', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 121, 'nombre': 'giliberto','correo': 'giliberto12@gmail.com', 'fecha': '2028/09/14', 'phone': '12346558', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 122, 'nombre': 'cristian', 'correo': 'cristian13@gmail.com',  'fecha': '2021/10/15', 'phone': '12346559', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 123, 'nombre': 'castro',   'correo': 'castro14@gmail.com',    'fecha': '2023/11/16', 'phone': '12346560', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 124, 'nombre': 'juaquin',  'correo': 'juaquin15@gmail.com',   'fecha': '2024/12/17', 'phone': '12346561', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 125, 'nombre': 'ismael',   'correo': 'ismael16@gmail.com',    'fecha': '2021/01/18', 'phone': '12346562', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 126, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 127, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 128, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 129, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 130, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 131, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 132, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 133, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 134, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 135, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 136, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 137, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 138, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 139, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 140, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 141, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 142, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 143, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 144, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 145, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 146, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 147, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 148, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 149, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 140, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 151, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 152, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 153, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 154, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 155, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 156, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 157, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 158, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 159, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 160, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 171, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 172, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 173, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 174, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 175, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 176, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 177, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 178, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 179, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 170, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 181, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 182, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 183, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 184, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 185, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 186, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 187, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 188, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 189, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 180, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 191, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 192, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 193, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 194, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 195, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 196, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 197, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 198, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 199, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
      {'id': 200, 'nombre': 'tifany',   'correo': 'tifany17@gmail.com',    'fecha': '2023/04/19', 'phone': '12346563', 'image':'https://i.pinimg.com/236x/85/9e/6b/859e6b028d922d5120d14ceddc7e2b6f.jpg'}, 
    ] ,[]) ;
    
  //!!! OJO SIEMPRE PASAR PARAMETRO CON NOMBRE COLUMNA NO CAMBIAR ESTE NOMBRE SINOS DARA ERROR

  const columns = React.useMemo(() => [ 
        {
          Header: 'ID',
          Footer: 'ID',
          accessor: 'id',
          Filter: ColumnFilter
        },
        {
          Header: 'Nombre',
          Footer: 'Nombre',
          accessor: 'nombre',
          Filter: ColumnFilter
        },
        {
          Header: 'Correo',
          Footer: 'Correo',
          accessor: 'correo',
          Filter: ColumnFilter
        },
        {
          Header: 'Fecha',
          Footer: 'Fecha',
          accessor: 'fecha',
          Filter: ColumnFilter
        },
        {
          Header: 'Phone',
          Footer: 'Phone',
          accessor: 'phone',
          Filter: ColumnFilter
        },
        {
          Header: 'Image',
          Footer: 'Image',
          accessor: 'image',
          Filter: ColumnFilter,
          Cell: ({cell: { value } }) => <img width={'50px'} height={'50px'} src={value} alt="Avatar" />
        },
        {
          Header: 'img',
          Footer: 'img',
          accessor: 'img',
          Filter: ColumnFilter,
          Cell: ({cell: { value } }) => (
            <>
              <img src={value} alt="Avatar" />
              <img src={value} alt="Avatar" />
              <img src={value} alt="Avatar" />
              <button>Submit</button>
            </>
            )
        },
    ],[]);

  /* const GROUPED_COLUMNS = [
    {
      Header: 'ID',
      Footer: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      Footer: 'Name',
      columns: [
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
      ],
    },
    {
      Header: 'Info',
      Footer: 'Info',
      columns: [
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
      ],
    }
  ]; */

  // !!! OJO SIEMPRE PASAR PARAMETRO CON NOMBRE COLUMNA NO CAMBIAR ESTE NOMBRE SINOS DARA ERROR

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    footerGroups,
    rows, 
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    ${
    (items.marcaFila) ? (`
    selectedFlatRows
    `) : (``)
    }
  } = useTable(
    {
      columns, 
      data, 
      /* pones esta linea solo si quieres que la tabla salte a una pagina especifica */
      // initialState: {pageIndex : 1}
    },
    useFilters,
    useGlobalFilter, 
    useSortBy,
    usePagination,
    ${
    (items.marcaFila) ? (`
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({getToggleAllRowsSelectedProps}) => (
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({row}) => (
              <CheckBox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns
        ]
      })
    } 
    `) : (``)
    }
    );
    
    /*   const columns = useMemo(() => (items.groupColumns ? GROUPED_COLUMNS : columns2), [items.groupColumns]); */
  const { globalFilter, pageIndex, pageSize } = state;
  const [currentPage, setCurrentPage] = useState(1);
  ${
  (items.paginacion || items.paginacion2) ? (`
  const handlePageClick = ( selectedPage ) => { 
    gotoPage(selectedPage.selected);
    setCurrentPage(selectedPage.selected)
  }
  `): (``)
  }

  return (
    <>
    <div className='texto-posicionado'>
      <div className='alignTableDecoration'>
        <span className='alignTableDecoration1'>
        ${
          (items.paginacion || items.paginacion2) ? (
          `<span className='alignTableDecoration2'>
            Mostrar:
            <span className='spacioCom'>
              <select value={pageSize} onChange = {e => setPageSize(Number(e.target.value))}>
                  {
                    [10, 25, 50].map(pageSize => (
                      <option key = {pageSize} value={pageSize}>
                        { pageSize }
                      </option>
                    ))
                  }
              </select>
            </span>
          </span>`) : (``)
        }
        ${(items.busquedaGeneral) ? (
          `<span>
            <span className='alignTableDecoration3'>
              <span className='spacioCom'>Buscar: {' '}</span>
                <input 
                  type="text" 
                  className='inputBusquedaTabla'
                  placeholder='general search'
                  name="globalFilter" 
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </span>
            </span>`): (``)}
          </span>
          <table {...getTableProps()} className='table-bordered'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column, index) => (
                      ${(items.ordenarColumna) ?
                        (`
                        <th key = {index}>
                          <span {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>  
                              {
                                (column.isSorted)? 
                                  (column.isSortedDesc ? 
                                    <span style={{color: 'none'}}>▾</span> 
                                  : <span style={{color: 'none'}}>▴</span>  
                                )
                                :''
                              }
                            </span>
                          </span>`):
                          (`<th {...column.getHeaderProps()}>
                          {column.render('Header')}`)
                      }
                      ${ (items.busquedaPorColumna) ? (`<div>{column.canFilter? column.render('Filter'): null }</div>`):``}
                      </th>
                    ))
                  }
                </tr>
              ))}
            </thead>  
            <tbody {...getTableBodyProps()}>
              ${
                (items.paginacion || items.paginacion2) ? 
                (`{page.map((row) => {`) : 
                (`{rows.map((row) => {`)
              }
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
            ${(items.footer) ? (
              `<tfoot>
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
              </tfoot>`
            ): ``}
          </table>
        ${
          (items.paginacion) ? (
            `<span className='alignTableDecoration1'>
            <span className='alignTableDecoration2'>
              Pagina: {' '}
              <strong className='spacioCom'>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{' '}
              Ir a la pagina: {' '}
              <span className='spacioCom'>
                <input 
                  type={'number'}  
                  defaultValue={pageIndex + 1}
                  onChange = { e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(pageNumber)
                  }}
                  style={{width: '50px'}}
                />
              </span>
            </span>
            <span className='alignTableDecoration3'>
              {/* <select value={pageSize} onChange = {e => setPageSize(Number(e.target.value))}>\
                  {
                    [10, 25, 50].map(pageSize => (
                      <option key = {pageSize} value={pageSize}>
                        show { pageSize }
                      </option>
                    ))
                  }
              </select> */}
              <button onClick={() => gotoPage(0)} disabled = { ! canPreviousPage } className='botonPag'>{'<<'}</button>
              <button onClick={() => previousPage()} disabled = { !canPreviousPage } className='botonPag'>{'Anterior'}</button>
              <button onClick={() => nextPage()} disabled = { !canNextPage } className='botonPag'>{'Siguiente'}</button>
              <button onClick={() => gotoPage(pageCount - 1)} disabled = {!canNextPage} className='botonPag'>{'>>'}</button>
            </span>
          </span>`
          ):(``)
        }
        ${
          (items.paginacion2) ? (`
            <span className='alignTableDecoration1'>
              <span className='alignTableDecoration2'>
                Pagina: {' '}
                <strong className='spacioCom'>
                  {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
                Ir a la pagina: {' '}
                <span className='spacioCom'>
                  <input 
                    type={'number'}  
                    defaultValue={pageIndex + 1}
                    onChange = { e => {
                      const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                      gotoPage(pageNumber)
                    }}
                    style={{width: '50px'}}
                  />
                </span>
              </span>
              <span className='alignTableDecoration3'>
                {/* <select value={pageSize} onChange = {e => setPageSize(Number(e.target.value))}>\
                    {
                      [10, 25, 50].map(pageSize => (
                        <option key = {pageSize} value={pageSize}>
                          show { pageSize }
                        </option>
                      ))
                    }
                </select> */}{/* 
                <button onClick={() => gotoPage(0)} disabled = { ! canPreviousPage } className='botonPag'>{'<<'}</button>
                <button onClick={() => previousPage()} disabled = { !canPreviousPage } className='botonPag'>{'Anterior'}</button>
                <button onClick={() => nextPage()} disabled = { !canNextPage } className='botonPag'>{'Siguiente'}</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled = {!canNextPage} className='botonPag'>{'>>'}</button>
                */}
                <ReactPaginate
                  previousLabel={"anterior"}
                  nextLabel={"siguiente"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={ pageOptions.length } // número total de páginas
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"react-paginate__page--selected"}
                  pageLinkClassName={'pagination-container'}
                  nextLinkClassName={'pagination-next-link'}
                  previousLinkClassName={'pagination-previous-link'}
                />
              </span>
            </span>
          `) : (``)
        }
        ${
          (items.marcaFila) ? (`
          <pre>
              <code>
                {
                  JSON.stringify(
                    {
                      selectedFlatRows: selectedFlatRows.map((row) => row.original),
                    },
                    null,
                    2
                    )
                  }
              </code>
            </pre>`): (``)
        }
      </div> 
    </div> 
    </>
  )
}`;
  
const code2 = `import React from 'react'

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
}`;

const codeCss = 
`table{
  background: rgb(255, 255, 255);
}
thead, tfoot, table thead tr th{
  background: #ebebeb;
  text-align: center;
  font-weight: 400;
  color: black;
}
table tr:nth-child(even){
  background-color: #ebebeb;
} 
tbody{
  text-align: center;
}
th, td{
  padding: 20px;
  border: 1 solid #ffffff;
}
table tbody tr:hover {
  background: rgb(225, 225, 225);
}
.table-bordered td ,.table-bordered th{
  border: 1px solid #ddd;
}
${
  (items.busquedaPorColumna || items.busquedaGeneral) ? (
`.inputBusquedaTabla{
  border: 1px solid rgb(175, 175, 175);
  border-radius: 5px;
  outline: rgb(175, 175, 175);
  padding-left: 5px;
  align-items: end;
  justify-content: end;
  background: black;
  padding-bottom: 4px;
}
.inputBusquedaTabla:focus{
  border: 1px solid rgb(65, 65, 65);
  border-radius: 5px;
  outline: rgb(56, 56, 56);
}`): (``)
}
${
  (items.paginacion) ?(
`.alignTableDecoration{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: end;
  text-align: end;
}
.alignTableDecoration1{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: end;
}
.alignTableDecoration2{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: start;
    /* padding: 5px */
}
.alignTableDecoration3{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: end;
    /* padding: 5px */
}
.anchoOption{
    width: 40px;
    text-align: end;
    font-size: 13px;
    margin-left: 10px;
}
.spacioCom{
    padding-left: 5px;
    padding-right: 5px;
}
.botonPag{
    padding-bottom: 3px;
    background: white;
    border: 1px solid #ddd;;
}`
  ): (``)
}
${
  (items.paginacion2) ? (
`.alignTableDecoration{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: end;
    text-align: end;
}
.alignTableDecoration1{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: end;
}
.alignTableDecoration2{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: start;
    /* padding: 5px */
}
.alignTableDecoration3{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: end;
    /* padding: 5px */
}
.anchoOption{
    width: 40px;
    text-align: end;
    font-size: 13px;
    margin-left: 10px;
}
.spacioCom{
    padding-left: 5px;
    padding-right: 5px;
}
  .pagination{
    /* contenedor de la paginacion */
    display: flex;
    padding-bottom: 3px; /* <-- modificar esto si pierde el border de bajo de la paginacion se pierde*/
    overflow: hidden;
    align-items: center;   
}
.pagination-container{
    /* contenedor de cada elemento cada numero */
    margin: 0;
    border: 1px solid #ddd;
    color: black;
    text-decoration: none;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 6px;
}
.pagination-container:hover{
    background: #b2b2b2;    
    color: black;
}
.pagination-next-link{
    border: 1px solid #ddd;
    color: black;
    text-decoration: none;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 2px;
    padding-bottom: 6px;
    margin: 0;
}
.pagination-previous-link{
    border: 1px solid #ddd;
    color: black;
    text-decoration: none;
    margin: 0;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 2px;
    padding-bottom: 6px;
}
.pagination-next-link:hover{
    color: black;
    margin: 0;
    background: #b2b2b2;
}
.pagination-previous-link:hover{
    color: black;
    margin: 0;
    background: #b2b2b2;
}
.react-paginate__page--selected{ 
    /* contenedor de la pagina actual seleccionada */
    background: #b2b2b2;
    margin-bottom: -3px;
    width: 100%;
    height: 100%; 
    padding-top: 2px;
    padding-bottom: 7px;
}
.break-me{
    /* margin: 0; */
    padding-bottom: 5px;
    margin-right: -5px;
}`):(``)
}
`;
const codeCheckbox = 
`import React from 'react'

export const CheckBox = React.forwardRef(({indeterminate, ...rest}, ref) => {

  const defaultRef = React.useRef()
  const resolveRef = ref || defaultRef;

  React.useEffect(( ) => {
      resolveRef.current.indeterminate = indeterminate
  }, [resolveRef, indeterminate]);

  return (
    <>
        <input type="checkbox" ref = {resolveRef} {...rest} />
    </>
  )
}
)`;
  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.ctrlKey && (event.key === '.' || event.key === ',')){
        generarCode();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [generarCode]);

  const agregarOrdenColumna = (value) => { 
    setItems({
      ...items,
      ordenarColumna: !value
    })
  }
  const busquedaGeneral = (value) => { 
    setItems({
      ...items,
      busquedaGeneral: !value
    })
  }
  const busquedaPorColumna = (value) => { 
    setItems({
      ...items,
      busquedaPorColumna: !value
    })
  }
  const paginacion = (value) => {
    setItems({
      ...items,
      paginacion: !value,
      paginacion2: false,
    })
  }
  const paginacion2 = (value) => {
    setItems({
      ...items,
      paginacion2: !value,
      paginacion: false
    })
  }
   
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = ( selectedPage ) => { 
    gotoPage(selectedPage.selected);
    setCurrentPage(selectedPage.selected)
  } 
/* 
  const firstPageRows = rows.slice(0,10);
 */
  return (
    <>    
    <div className='position-relative'>
    <nav className='barraApple2'> 
      <div className='tabla2'>
        <div className='itemTableAdd'>
          <input 
            type="checkbox" 
            checked={items.footer}
            onChange={() => agregarFooter(items.footer)}
            />
          <span style={{paddingLeft: '4px'}}>Agregar footer</span>
        </div>
        <div className='itemTableAdd'>
          <input 
            type="checkbox" 
            checked={items.ordenarColumna}
            onChange={() => agregarOrdenColumna(items.ordenarColumna)}
            />
          <span style={{paddingLeft: '4px'}}>Agregar ordenamiento por columna</span>
        </div>
        <div className='itemTableAdd'>
          <input 
            type="checkbox" 
            checked={items.busquedaGeneral}
            onChange={() => busquedaGeneral(items.busquedaGeneral)}
            />
          <span style={{paddingLeft: '4px', paddingBottom: '20px'}}>Agregar busqueda general</span>
        </div>
        <div className='itemTableAdd'>
          <input 
            type="checkbox" 
            checked={items.busquedaPorColumna}
            onChange={() => busquedaPorColumna(items.busquedaPorColumna)}
            />
          <span style={{paddingLeft: '4px'}}>Agregar busqueda por columna</span>
        </div>
        <div className='itemTableAdd'>
          <input 
            type="checkbox" 
            checked={items.paginacion}
            onChange={() => paginacion(items.paginacion)}
            />
          <span style={{paddingLeft: '4px'}}>Agregar paginacion</span>
        </div>
        <div className='itemTableAdd'>
          <input 
            type="checkbox" 
            checked={items.paginacion2}
            onChange={() => paginacion2(items.paginacion2)}
            />
          <span style={{paddingLeft: '4px'}}>Agregar paginacion 2</span>
        </div>
        <div className='itemTableAdd'>
          <input 
            type="checkbox" 
            checked={items.marcaFila}
            onChange={() => marcarFila(items.marcaFila)}
            />
          <span style={{paddingLeft: '4px'}}>Agregar marcador de fila</span>
        </div>
      </div>
      <button className='botonGenerateStyleApple2' onClick={generarCode}>
        <FontAwesomeIcon icon={faCode} />
        <span style={{paddingLeft: '5px'}}>Code</span>
      </button>
    </nav>
      {
        (items.generarCode) ? (
          <div className='contenedorCodeApple2'>
            {
              (items.busquedaPorColumna) ? (
                <>
                  <GeneradorTextoCodigo code={code2} textClass={'ColumnFilter.jsx'} typeFile={'react'} dateType={'javascript'} />
                </>
              ) : ('')
            }
            {
              (items.marcaFila) ? (
                <>
                  <GeneradorTextoCodigo code={codeCheckbox} textClass={'CheckBox.jsx'} typeFile={'react'} dateType={'javascript'} />
                </>
              ) : ('')
            }
            <GeneradorTextoCodigo code={codeCss} textClass={'css'} typeFile={'css'} dateType={'css'} />
            <GeneradorTextoCodigo code={code} textClass={'Lista.jsx'} typeFile={'react'} dateType={'javascript'} />
          </div>
        ) : ( 
    <div className='texto-posicionado'>
      <div className='alignTableDecoration'>
        {
          (items.marcaFila)? (
            <p style={{background:'blue', textAlign: 'center'}}>si se agrego el checkbox de cada columna solo que no se ve</p>
          ):(``)
        }
        <span className='alignTableDecoration1'>
        {
          (items.paginacion || items.paginacion2 ) ? (
            <span className='alignTableDecoration2'>
            Mostrar:
            <span className='spacioCom'>
              <select value={pageSize} onChange = {e => setPageSize(Number(e.target.value))}>
                  {
                    [10, 25, 50].map(pageSize => (
                      <option key = {pageSize} value={pageSize}>
                        { pageSize }
                      </option>
                    ))
                  }
              </select>
            </span>
          </span> ) : (``)
        }
        {
          (items.busquedaGeneral) ?(
          <span className='alignTableDecoration3'>
            <span className='spacioCom'>Buscar: {' '}</span>
            <input 
              type="text" 
              className='inputBusquedaTabla'
              placeholder='general search'
              name="globalFilter" 
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              />
          </span>
          ): ('')
        }
        </span>
        <table {...getTableProps()} className='table-bordered'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {(items.ordenarColumna) ? (
                  headerGroup.headers.map((column, index) => (
                    <th key={index}>
                      <span {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                        <span>  
                          {
                            (column.isSorted)? 
                              (column.isSortedDesc ? 
                                <span style={{color: 'none'}}>▾</span> 
                              : <span style={{color: 'none'}}>▴</span>  
                              )
                              :``
                          }
                        </span>
                      </span>
                      {
                        (items.busquedaPorColumna) ? 
                        (<div>{column.canFilter? column.render('Filter'): null }</div>):
                        ('')
                      }
                    </th>
                  )))
                  :(headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                      {
                        (items.busquedaPorColumna) &&
                        <div>{column.canFilter? column.render('Filter'): null }</div>
                      }
                    </th>
                  )))
                }
              </tr>
            ))}
          </thead>  
          <tbody {...getTableBodyProps()}>
          {
            (items.paginacion || items.paginacion2 ) ? (
                // page.slice(0,10).map((row) => {      <-- este es para ver de cuanto en cuanto ver cada pagina pero no esta configurado totalmente
                page.map((row) => {
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
                })
            ) : (
              rows.map((row) => {
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
              })
            )
          }
          </tbody>
          {
            (items.footer)&&(
              footerTable
            )
          }
        </table>   
        {
          (items.paginacion) ? 
          (
            <span className='alignTableDecoration1'>
              <span className='alignTableDecoration2'>
                Pagina: {' '}
                <strong className='spacioCom'>
                  {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
                Ir a la pagina: {' '}
                <span className='spacioCom'>
                  <input 
                    type={'number'}  
                    defaultValue={pageIndex + 1}
                    onChange = { e => {
                      const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                      gotoPage(pageNumber)
                    }}
                    style={{width: '50px'}}
                  />
                </span>
              </span>
              <span className='alignTableDecoration3'>
                {/* <select value={pageSize} onChange = {e => setPageSize(Number(e.target.value))}>\
                    {
                      [10, 25, 50].map(pageSize => (
                        <option key = {pageSize} value={pageSize}>
                          show { pageSize }
                        </option>
                      ))
                    }
                </select> */}
                <button onClick={() => gotoPage(0)} disabled = { ! canPreviousPage } className='botonPag'>{'<<'}</button>
                <button onClick={() => previousPage()} disabled = { !canPreviousPage } className='botonPag'>{'Anterior'}</button>
                <button onClick={() => nextPage()} disabled = { !canNextPage } className='botonPag'>{'Siguiente'}</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled = {!canNextPage} className='botonPag'>{'>>'}</button>
                {/* 
                <ReactPaginate
                  previousLabel={"anterior"}
                  nextLabel={"siguiente"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={ pageOptions.length } // número total de páginas
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"react-paginate__page--selected"}
                  pageLinkClassName={'pagination-container'}
                  nextLinkClassName={'pagination-next-link'}
                  previousLinkClassName={'pagination-previous-link'}
                /> */}
              </span>
              
            </span>
          ) : (``)
        }
        {
          (items.paginacion2) ? 
          (
            <span className='alignTableDecoration1'>
              <span className='alignTableDecoration2'>
                Pagina: {' '}
                <strong className='spacioCom'>
                  {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
                Ir a la pagina: {' '}
                <span className='spacioCom'>
                  <input 
                    type={'number'}  
                    defaultValue={pageIndex + 1}
                    onChange = { e => {
                      const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                      gotoPage(pageNumber)
                    }}
                    style={{width: '50px'}}
                  />
                </span>
              </span>
              <span className='alignTableDecoration3'>
                {/* <select value={pageSize} onChange = {e => setPageSize(Number(e.target.value))}>\
                    {
                      [10, 25, 50].map(pageSize => (
                        <option key = {pageSize} value={pageSize}>
                          show { pageSize }
                        </option>
                      ))
                    }
                </select> */}{/* 
                <button onClick={() => gotoPage(0)} disabled = { ! canPreviousPage } className='botonPag'>{'<<'}</button>
                <button onClick={() => previousPage()} disabled = { !canPreviousPage } className='botonPag'>{'Anterior'}</button>
                <button onClick={() => nextPage()} disabled = { !canNextPage } className='botonPag'>{'Siguiente'}</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled = {!canNextPage} className='botonPag'>{'>>'}</button>
                */}
                <ReactPaginate
                  previousLabel={"anterior"}
                  nextLabel={"siguiente"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={ pageOptions.length } // número total de páginas
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"react-paginate__page--selected"}
                  pageLinkClassName={'pagination-container'}
                  nextLinkClassName={'pagination-next-link'}
                  previousLinkClassName={'pagination-previous-link'}
                />
              </span>
            </span>
          ) : (``)
        }
        {
          (items.marcaFila) ? (
          <>
            <h3>SI SE AGREGO EL CHECKBOX DE CADA COLUMNA SOLO QUE NO SE VE</h3>
            <pre>
              <code>
                {
                  JSON.stringify(
                    {
                      selectedFlatRows: selectedFlatRows.map((row) => row.original),
                    },
                    null,
                    2
                    )
                  }
              </code>
            </pre>
          </>
          ) : (``)
        }
      </div>           
    </div>   
        )
    }
    </div>
    </>
  )
}