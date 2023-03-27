import React from 'react';

export const ValidarJWT = (data, nombre, data2) => {

    let nuevoNombre = nombre.trim().split(' ');
    nuevoNombre = nuevoNombre.map(resp =>{
        return resp.toLowerCase();
    });
    let verifica = '';
    for (const key in data.inputForm) {
        if((data.inputForm[key]+''.trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo' || 
            data.inputForm[key]+''.trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo_' ||
            data.inputForm[key]+''.trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email' ||
            data.inputForm[key]+''.trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email_') ){
                verifica = data.inputForm[key].trim().replace(/_/g, '').toLowerCase(); 
        }
    }

    const validarJWT = 
`/*----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                             FECHA: ${new Date()}
-- MÓDULO: ${nuevoNombre}                    PROYECTO: TIENDA               ACTIVIDAD: set-app-1
-- CREACIÓN DEL MIDDLEWARES VALIDACION DEL TOKEN PARA: ${nuevoNombre}                                                   
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

-- validarJWT
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

 - Se implementaron la validacion del token para el ${nuevoNombre}.
----------------------------------------------------------------------------------------------------------------------------
*/

const jwt = require('jsonwebtoken');
const { db } = require('../database/config');

const validarJWT = async(req, res, next) => {
    
    try{

        const pg = await db.connect();
        const sql = 'SELECT * FROM ${nuevoNombre} WHERE ${verifica} = $1 and estadoeliminar = $2';

        const token = req.header('x-token');

        if(!token){
            // se manda 400 porque la solicitud es incorrecta o incompleta
            return res.status(400).json({
                msg: 'no token provide'
            })
        }

        const { correo } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        pg.query(sql, [correo, true], (err, result ) => {
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
                    req.${nuevoNombre} = result.rows[0];
                    next();
                }else{
                    return res.status(404).json({
                        msg: 'the ${nuevoNombre} not found'
                    })
                }
            }
        })
        
    }catch(err){
        console.log(err);
        return res.status(401).json({
            msg: 'token expire or invalid'
        })
    }
}
module.exports = {
    validarJWT,
}`;

  return {
    validarJWT
  }
}
