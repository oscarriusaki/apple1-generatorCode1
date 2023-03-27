import React from 'react';

export const NodejsRouter = (data, nombre, data2) => {

    let dataAux = '';
    let count = 1;
    for( const n in data2.inputForm ){
      dataAux += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
      count ++;
    } 
    
    let palabra = nombre.trim().replace(/[\s_]+/g, ' ').split(' ')
    palabra = palabra.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    palabra = palabra.join('');

    let user='';
    let nodejsRouter=''
    if(nombre.trim().toLowerCase() === 'user' || nombre.trim().toLowerCase() === 'usuario'||
        nombre.trim().toLowerCase() === 'employee' || nombre.trim().toLowerCase() === 'empleado'||
        nombre.trim().toLowerCase() === 'administrator' || nombre.trim().toLowerCase() === 'administrador'){
      user =
`/*----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                             FECHA: ${new Date()}
-- MÓDULO: ${palabra}                    PROYECTO: TIENDA               ACTIVIDAD: set-app-1
-- CREACIÓN DEL ROUTER: ${palabra}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

 - get${palabra}s
 - get${palabra}
 - post${palabra}
 - put${palabra}
 - delete${palabra}
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- Se implementaron todas las rutas del modulo ${palabra}: 
 - get${palabra}s
 - get${palabra}
 - post${palabra}
 - put${palabra}
 - delete${palabra}
----------------------------------------------------------------------------------------------------------------------------
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { get${palabra}s, 
        get${palabra}, 
        post${palabra}, 
        put${palabra}, 
        delete${palabra} } = require('../controller/${palabra}');
const { validar } = require('../middlewares/validar');
const { validarJWT${palabra} } = require('../middlewares/ValidarJWT${palabra}');

const router = Router();

router.get('/', get${palabra}s);
router.get('/:id',[
    check('id', 'Id no valid').isNumeric(),
    validar
], get${palabra});
router.post('/', post${palabra});
router.put('/',[
    validarJWT${palabra},
    validar
], put${palabra});
router.delete('/:id',[
    validarJWT${palabra},
    validar
], delete${palabra});

module.exports = router;    
`;

}else{

    nodejsRouter = 
`/* ----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                             FECHA: ${new Date()}
-- MÓDULO: ${palabra}                    PROYECTO: TIENDA               ACTIVIDAD: set-app-1
-- CREACIÓN DEL ROUTE: ${palabra}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

 - get${palabra}s
 - get${palabra} 
 - post${palabra}
 - put${palabra}
 - delete${palabra}
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- Se implementaron todas las rutas del modulo ${palabra}: 
 - get${palabra}s
 - get${palabra}
 - post${palabra}
 - put${palabra}
 - delete${palabra}
----------------------------------------------------------------------------------------------------------------------------
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { get${palabra}s, 
        get${palabra}, 
        post${palabra}, 
        put${palabra}, 
        delete${palabra} } = require('../controller/${palabra}');
const { validar } = require('../middlewares/validar');

const router = Router();

router.get('/', get${palabra}s);
router.get('/:id',[
    check('id', 'The id is not valid').isNumeric(),
    validar,
], get${palabra});
router.post('/', post${palabra});
router.put('/:id',[
    check('id', 'The id is not valid').isNumeric(),
    validar,
], put${palabra});
router.delete('/:id',[
    check('id', 'The id is not valid').isNumeric(),
    validar,
], delete${palabra});
module.exports = router;`;
}

    if(nombre.trim().toLowerCase() === 'user' || nombre.trim().toLowerCase() === 'usuario'||
        nombre.trim().toLowerCase() === 'employee' || nombre.trim().toLowerCase() === 'empleado'||
        nombre.trim().toLowerCase() === 'administrator' || nombre.trim().toLowerCase() === 'administrador'){
        nodejsRouter = user;
    }
    return {
        nodejsRouter,
    }
} 