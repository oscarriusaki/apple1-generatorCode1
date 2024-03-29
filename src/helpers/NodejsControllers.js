import React from 'react';

export const NodejsControllers = (data, nombre, data2) => {
    
    let nombreTabla = nombre.trim().split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    let tablaAux = '';
    tablaAux = nombreTabla.join('_').toLowerCase()
    nombreTabla = 'id_' + nombreTabla.join('_').toLowerCase();

    let dataAux = '';
    let dataAux2 = '';
    let dataAux3 = '';
    let count = 1;
    let count2 = 1; 
    let email_columna = '';
    let password_columna = '';
    let cantidadDolar = '';
    let cantidadDolar2 = '';
    let postCountDolar = '';
    let putCountDolar = '';
    let contadorAuxiliarReal = 1;
    let insertTable2 = '';
    for( const n in data2.inputForm ){
        cantidadDolar += `$${count}, `;
        if(data.inputForm[n].trim() !== 'id_'+nombreTabla){
            // insertTable +=  data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +  ", ";
            if((data2.inputForm[n].trim() === 'varchar') || 
               (data2.inputForm[n].trim() === 'date') || 
               (data2.inputForm[n].trim() === 'text')||
               (data2.inputForm[n].trim() === 'timestamp')||
               (data2.inputForm[n].trim() === 'character varying') ){
                insertTable2 += `"${data2.inputForm[n].trim()}": '', \n`; 
            }else{
                insertTable2 += `"${data2.inputForm[n].trim()}":  , \n`; 
            }
        }
        if(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() !== nombreTabla){
            dataAux2 += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() +', ';
            cantidadDolar2 += `$${count2}, `;
            count2++;
            contadorAuxiliarReal ++;
        }
        dataAux += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() +', ';
        if(((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo_' + tablaAux) || 
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email_' + tablaAux)  || 
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email') || 
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo')) && (
            (tablaAux === 'user')           || 
            (tablaAux === 'usuario')        || 
            (tablaAux === 'employee')       || 
            (tablaAux === 'empleado')       || 
            (tablaAux === 'administrator')  || 
            (tablaAux === 'administrador')
            )
            ){
            email_columna = data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase();
        }
       
        if(((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'password_' + tablaAux)   || 
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'pas_' + tablaAux)        || 
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'contrasena_' + tablaAux) ||
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'password')               ||
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'pas')                    ||
            (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'contrasena')
            ) && 
           ((tablaAux === 'user')           || 
            (tablaAux === 'usuario')        || 
            (tablaAux === 'employee')       || 
            (tablaAux === 'empleado')       || 
            (tablaAux === 'administrator')  || 
            (tablaAux === 'administrador')
           )
        ){
         password_columna = data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase();
        }
        count ++;
    } 
    insertTable2 = insertTable2.trim().slice(0 ,-1);
    dataAux = dataAux.trim().slice(0,-1);
    dataAux2 = dataAux2.trim().slice(0,-1);
    cantidadDolar = cantidadDolar.trim().slice(0, -1);
    cantidadDolar2 = cantidadDolar2.trim().slice(0, -1);
    postCountDolar = cantidadDolar2 + `, $${count2}`;
    count2++;
    putCountDolar  = postCountDolar + `, $${count2}`;
    let palabra = nombre.trim().split(' ')
    palabra = palabra.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    palabra = palabra.join('');

    let nodejsControllers = '';
    let usuario = '';

    if(nombre.trim().toLowerCase() === 'user' || nombre.trim().toLowerCase() === 'usuario'||
        nombre.trim().toLowerCase() === 'employee' || nombre.trim().toLowerCase() === 'empleado'||
        nombre.trim().toLowerCase() === 'administrator' || nombre.trim().toLowerCase() === 'administrador'){
        usuario =     
`/*----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                             FECHA: ${new Date()}
-- MÓDULO: ${nombreTabla}                    PROYECTO: TIENDA               ACTIVIDAD: set-app-1
-- CREACIÓN DEL MODULO CONTROLLER: ${palabra}                                                   
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

 -GET http://localhost:8080/${nombreTabla}
 -GET http://localhost:8080/${nombreTabla}/2
 -POST http://localhost:8080/${nombreTabla}     
{
${insertTable2}
}
 -PUT http://localhost:8080/${nombreTabla}/2
{
${insertTable2}
}
 -PUT http://localhost:8080/${nombreTabla}/2

----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

 - Se implementaron todas las funciones get${palabra}s, get${palabra}, post${palabra}, put${palabra}, delete${palabra}.
----------------------------------------------------------------------------------------------------------------------------
*/

const { response } = require("express");

const { db } = require("../database/config");
const bcryptjs = require('bcryptjs');
const { GenerarJWT } = require("../helpers/GenerarJWT");

const get${palabra}s = async (req, res = response) => {

    const pg = await db.connect();
    try {

        const sql = 'SELECT * from public."fn_get${palabra}s"()';
        pg.query(sql, (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });
            }else{
                if(result.rowCount >= 1){
                    return res.status(200).json(result.rows);
                }else{
                    return res.status(404).json({
                        msg: '${palabra} not found'
                    });
                }
            }
        });
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        });
    }finally{
        pg.release();
    }
}
const get${palabra} = async(req, res = response) => {
    
    const pg = await db.connect();
    try {

        const { id } = req.params;
        const sql = 'SELECT * from public."fn_get${palabra}"($1)';
        pg.query(sql, [id], (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });
            }else{
                if(result.rowCount === 1){
                    return res.status(200).json(result.rows[0])
                }else{
                    return res.status(404).json({
                        msg: '${palabra} not found'
                    });
                }
            }
        });
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        });
    }finally{
        pg.release();
    }
}
const post${palabra} = async(req, res = response) => {
    
    const pg = await db.connect();
    try {

        let {${dataAux2}} = req.body;
        const tokens = await GenerarJWT(${email_columna});
        const salt = bcryptjs.genSaltSync();
        ${password_columna} = bcryptjs.hashSync(${password_columna}, salt);
        const sql = 'SELECT public."fn_post${palabra}"(${[postCountDolar]})';

        pg.query(sql, [${dataAux2}, tokens], async (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });
            }else{
                if(result.rowCount === 1){
                    if(result.rows[0].fn_post${palabra} === 'successfully registered'){
                        return res.status(200).json({
                            msg: result.rows[0].fn_post${palabra} 
                        });
                    }else{  
                        return res.status(500).json({
                            msg: result.rows[0].fn_post${palabra} 
                        });
                    }
                }else{
                    return res.status(500).json({
                        msg: 'there was an error in the query'
                    });
                }
            }
        });
    
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        })
    }finally{
        pg.release();
    }
    
}
const put${palabra} = async (req, res = response) => {
    
    const pg = await db.connect();
    try {

        const pg = await db;
        const id = req.${tablaAux}.id_${tablaAux};
        let   {${dataAux2}} = req.body;
        const tokens = await GenerarJWT(${email_columna});
        const salt = bcryptjs.genSaltSync();
        ${password_columna}  = bcryptjs.hashSync(${password_columna}, salt);
        const sql = 'SELECT public."fn_put${palabra}"(${putCountDolar})';

        pg.query(sql, [${dataAux2}, id, tokens ], async(err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });
            }else{   
                if(result.rowCount === 1){
                    if(result.rows[0].fn_put${palabra} === 'successfully updated'){
                        return res.status(200).json({
                            msg: result.rows[0].fn_put${palabra} 
                        });
                    }else{
                        return res.status(500).json({
                            msg: result.rows[0].fn_put${palabra} 
                        });
                    }
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    });
                }
            }
        });

    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        });
    }finally{
        pg.release();
    }
}
const delete${palabra} = async (req, res = response) => {
    
    const pg = await db.connect();
    try {
        const { id } = req.params;
        const sql = 'SELECT public."fn_delete${palabra}"($1)';

        pg.query(sql, [id], (err, result ) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });                    
            }else{
                if(result.rowCount === 1){
                    if(result.rows[0].fn_delete${palabra} === 'successfully eliminated'){
                        return res.status(200).json({
                            msg: result.rows[0].fn_delete${palabra} 
                        });
                    }else{
                        return res.status(500).json({
                            msg: result.rows[0].fn_delete${palabra} 
                        });
                    }
                }else{
                    return res.status(500).json({
                        msg: 'no ${palabra} found'
                    });
                }
            }
        });
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        });
    }finally{
        pg.release();
    }
}

module.exports = {
    get${palabra}s,
    get${palabra} ,
    post${palabra},
    put${palabra},
    delete${palabra}
}`;

}else{

    nodejsControllers =      
`/*----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                             FECHA: ${new Date()}
-- MÓDULO: ${palabra}                    PROYECTO: TIENDA               ACTIVIDAD: set-app-1
-- CREACIÓN DEL MODULO CONTROLLER: ${palabra}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

 -GET http://localhost:8080/${nombreTabla}
 -GET http://localhost:8080/${nombreTabla}/2
 -POST http://localhost:8080/${nombreTabla}     
{
${insertTable2}
}
 -PUT http://localhost:8080/${nombreTabla}/2
{
${insertTable2}
}
 -PUT http://localhost:8080/${nombreTabla}/2

----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

 - Se implementaro todas las funciones get${palabra}s, get${palabra}, post${palabra}, put${palabra}, delete${palabra}.
----------------------------------------------------------------------------------------------------------------------------
*/

const { db } = require("../database/config");

const  get${palabra}s = async (req, res) => {
    
    const pg = await db.connect();
    try {
        const sql = 'SELECT * FROM public."fn_get${palabra}s"()';
        
            pg.query(sql, (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });                    
            }else{
                if(result.rowCount >= 1){
                    return res.status(200).json(result.rows);
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    });
                }
            }
        });

    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        });
    }finally{
        pg.release();
    }
}
const get${palabra} = async (req, res) => {

    const pg = await db.connect();
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM public."fn_get${palabra}"($1)';

        pg.query(sql, [id], (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });                    
            }else{
                if(result.rowCount === 1){
                    return res.status(200).json(result.rows);
                }else{
                    return res.status(404).json({
                        msg: '${palabra} not found'
                    });
                }
            }
        });
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        });
    }finally{
        pg.release();
    }
}
const post${palabra} = async (req, res) => {

    const pg = await db.connect();
    try {
        const { ${dataAux2} } = req.body;        
        const sql = 'SELECT public."fn_post${palabra}"(${cantidadDolar2})';

        pg.query(sql, [ ${dataAux2}] , (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });                    
            }else{
                if(result.rowCount === 1){
                    if(result.rows[0].fn_post${palabra} === 'successfully registered'){
                        return res.status(200).json({
                            msg: result.rows[0].fn_post${palabra}    
                        });
                    }else{
                        return res.status(404).json({
                            msg: result.rows[0].fn_post${palabra}    
                        });
                    }
                }else{
                    return res.status(500).json({
                        msg: 'there was an error in the query'
                    });
                }
            }
        });
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        })
    }finally{
        pg.release();
    }
}
const put${palabra} = async (req, res) => {

    const pg = await db.connect();
    try {
        const { id } = req.params;
        const { ${dataAux2} } = req.body;        
        const sql = 'SELECT public."fn_put${palabra}"(${cantidadDolar2}, $${contadorAuxiliarReal++})';
        pg.query(sql, [ ${dataAux2}, id ], (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });                    
            }else{
                if(result.rowCount === 1){
                    if(result.rows[0].fn_put${palabra} === 'successfully updated'){
                        return res.status(404).json({
                            msg: result.rows[0].fn_put${palabra}
                        });
                    }else{
                        return res.status(500).json({
                            msg: result.rows[0].fn_put${palabra}
                        });
                    }
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    });
                }
            }
        });
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        })
    }finally{
        pg.release();
    }
}
const delete${palabra} = async (req, res) => {

    const pg = await db.connect();
    try {
        const { id } = req.params;
        const sql = 'SELECT public."fn_delete${palabra}"($1)';
        pg.query(sql , [id] , (err, result) => {
            if(err){
                return res.status(500).json({
                    code: err.code, 
                    name: err.name, 
                    hint: err.hint,
                    detail: err.detail,
                    where: err.where,   
                    file: err.file,
                });                    
            }else{
                if(result.rowCount === 1){
                    if(result.rows[0].fn_delete${palabra} === 'successfully eliminated'){
                        return res.status(200).json({
                            msg: result.rows[0].fn_delete${palabra}
                        });
                    }else{
                        return res.status(404).json({
                            msg: result.rows[0].fn_delete${palabra}
                        });
                    }
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    });
                }
            }
        });
    }catch(err){
        return res.status(500).json({
            msg: ${`'There was an error in the server please talt to the administrator' + err`}
        });
    }finally{
        pg.release();
    }
}
module.exports = {
    get${palabra}s,
    get${palabra},
    post${palabra},
    put${palabra},
    delete${palabra}
}`;
}
    if(nombre.trim().toLowerCase() === 'user' || nombre.trim().toLowerCase() === 'usuario'||
        nombre.trim().toLowerCase() === 'employee' || nombre.trim().toLowerCase() === 'empleado'||
        nombre.trim().toLowerCase() === 'administrator' || nombre.trim().toLowerCase() === 'administrador'){
                nodejsControllers = usuario;    
    }
    return {
        nodejsControllers,
    }
}










 
    
    
    