import React from 'react';

export const NodejsControllers = (data, nombre, data2) => {
    
    let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    let tablaAux = '';
    tablaAux = nombreTabla.join('_').toLowerCase()
    nombreTabla = 'id_' + nombreTabla.join('_').toLowerCase();

    let dataAux = '';
    let dataAux2 = '';
    let count = 1;
    let count2 = 1; 
    let email_columna = '';
    let password_columna = '';
    let cantidadDolar = '';
    let cantidadDolar2 = '';
    let postCountDolar = '';
    let putCountDolar = '';
    let contadorAuxiliarReal = 1;
    for( const n in data2.inputForm ){
        cantidadDolar += `$${count}, `;
        if(data[n].trim().toLowerCase() !== nombreTabla){
            dataAux2 += data[n].trim().toLowerCase() +', ';
            cantidadDolar2 += `$${count2}, `;
            count2++;
            contadorAuxiliarReal ++;
        }
        dataAux += data[n].trim().toLowerCase() +', ';
        if(((data[n].trim().toLowerCase() === 'correo_' + tablaAux) || 
            (data[n].trim().toLowerCase() === 'email_' + tablaAux)  || 
            (data[n].trim().toLowerCase() === 'email') || 
            (data[n].trim().toLowerCase() === 'correo')) && (
            (tablaAux === 'user')           || 
            (tablaAux === 'usuario')        || 
            (tablaAux === 'employee')       || 
            (tablaAux === 'empleado')       || 
            (tablaAux === 'administrator')  || 
            (tablaAux === 'administrador')
            )
            ){
            email_columna = data[n].trim().toLowerCase();
        }
       
        if(((data[n].trim().toLowerCase() === 'password_' + tablaAux)   || 
            (data[n].trim().toLowerCase() === 'pas_' + tablaAux)        || 
            (data[n].trim().toLowerCase() === 'contrasena_' + tablaAux) ||
            (data[n].trim().toLowerCase() === 'password')               ||
            (data[n].trim().toLowerCase() === 'pas')                    ||
            (data[n].trim().toLowerCase() === 'contrasena')
            ) && 
           ((tablaAux === 'user')           || 
            (tablaAux === 'usuario')        || 
            (tablaAux === 'employee')       || 
            (tablaAux === 'empleado')       || 
            (tablaAux === 'administrator')  || 
            (tablaAux === 'administrador')
           )
        ){
         password_columna = data[n].trim().toLowerCase();
        }
        /* if(data[n].trim().toLowerCase().indexOf('correo_') != -1 
            || data[n].trim().toLowerCase().indexOf('email_') != -1){
            // email_columna = data[n].trim().toLowerCase();
        }
        
        if((data[n].trim().toLowerCase().indexOf('password_') != -1)
        || (data[n].trim().toLowerCase().indexOf('pas_') != -1)
        || (data[n].trim().toLowerCase().indexOf('contrasena_') != -1)){
            // password_columna = data[`columna${count}`].trim().toLowerCase();
        } */
        count ++;
    } 
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
        usuario = `    
    const { response } = require("express");

    const { db } = require("../database/config");
    const bcryptjs = require('bcryptjs');
    const { GenerarJWT } = require("../helpers/GenerarJWT");

    const get${palabra}s = async (req, res = response) => {
        const pg = await db;
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
                    })
                }
            }
        })

    }
    const get${palabra} = async(req, res = response) => {
        const pg = await db;
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
                    })
                }
            }
        })
    }
    const post${palabra} = async(req, res = response) => {
        
        try{

        const pg = await db;
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
                        })
                    }else{  
                        return res.status(500).json({
                            msg: result.rows[0].fn_post${palabra} 
                        })
                    }
                }else{
                    return res.status(500).json({
                        msg: 'there was an error in the query'
                    })
                }
            }
        })
        
        }catch(err){
            return res.status(500).json({
                msg: 'internal server error'
            });
        }
        
    }
    const put${palabra} = async (req, res = response) => {
        
        try{    
        const pg = await db;
        const { id } = req.${tablaAux}.id_${tablaAux};
        let   {${dataAux2}} = req.body;
        const tokens = await GenerarJWT(${email_columna});
        const salt = bcryptjs.genSaltSync();
        ${password_columna}  = bcryptjs.hashSync(${password_columna}, salt);
        const sql = 'SELECT public."fn_put${palabra} "(${putCountDolar})';

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
                        })
                    }else{
                        return res.status(500).json({
                            msg: result.rows[0].fn_put${palabra} 
                        })
                    }
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    })
                }
            }
        });

        }catch(err){
            return res.status(500).json({
                msg: 'There was an error please talt to the administrator'
            });
        }
    }
    const delete${palabra} = async (req, res = response) => {
        
        const pg = await db;
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
                        msg: no ${palabra} found
                    });
                }
            }
        });
    }

    module.exports = {
        get${palabra}s,
        get${palabra} ,
        post${palabra},
        put${palabra},
        delete${palabra}
    }
    `;
}else{
    nodejsControllers = `      
    const { db } = require("../database/config")

    const  get${palabra}s = async (req, res) => {
        const pg = await db;
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
                    return res.status(200).json(result.rows)
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    })
                }
            }
        })
    }
    const get${palabra} = async (req, res) => {
        const pg = await db;
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
                    })
                }
            }
        })
    }
    const post${palabra} = async (req, res) => {
        const pg = await db;
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
                        })
                    }else{
                        return res.status(404).json({
                            msg: result.rows[0].fn_post${palabra}    
                        })
                    }
                }else{
                    return res.status(500).json({
                        msg: 'there was an error in the query'
                    })
                }
            }
        })

    }
    const put${palabra} = async (req, res) => {
        const pg = await db;
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
                        })
                    }else{
                        return res.status(500).json({
                            msg: result.rows[0].fn_put${palabra}
                        })
                    }
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    })
                }
            }
        })
    }
    const delete${palabra} = async (req, res) => {
        const pg = await db;
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
                        })
                    }else{
                        return res.status(404).json({
                            msg: result.rows[0].fn_delete${palabra}
                        })
                    }
                }else{
                    return res.status(404).json({
                        msg: 'no ${palabra} found'
                    })
                }
            }
        })

    }
    module.exports = {
        get${palabra}s,
        get${palabra},
        post${palabra},
        put${palabra},
        delete${palabra}
    }
    `;
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
