import React from 'react';

export const NodejsControllers = (data, nombre, data2) => {
    
    let dataAux = '';
    let count = 1;
    let validarUser = false;
    let email_columna = '';
    let password_columna = '';
    let cantidadDolar = '';
    for( const n in data2.inputForm ){
        cantidadDolar += `$${count}, `;
        dataAux += data[`columna${count}`]+''.trim().toLowerCase() +', ';
        // console.log(data[`columna${count}` +':'+ data2[`columna${count}`]]);
        // console.log(data[`columna${count}`]+''.trim().toLowerCase().slice(0,7), '+++++++++++')
        if((data[`columna${count}`].trim().toLowerCase().slice(0,7) === 'correo_')
            || (data[`columna${count}`].trim().toLowerCase().slice(0,7) === 'email_')){
            email_columna = data[`columna${count}`].trim().toLowerCase();
        }else
        // const verify2 = data[`columna${count}`].trim().toLowerCase().inde;
       
        if((data[`columna${count}`].trim().toLowerCase().slice(0,9) === 'password_')
            || (data[`columna${count}`].trim().toLowerCase().slice(0,4) === 'pas_')
            || (data[`columna${count}`].trim().toLowerCase().slice(0,11) === 'contrasena_')){
            password_columna = data[`columna${count}`].trim().toLowerCase();
            console.log((data[`columna${count}`].trim().toLowerCase().slice(0,11) === 'contrasena_'),'MOSTRANDO PASSWORD')
        }else
        if(data[`columna${count}`]+''.trim().toLowerCase().indexOf('correo_') != -1 
            || data[`columna${count}`]+''.trim().toLowerCase().indexOf('email_') != -1){
            // email_columna = data[`columna${count}`]+''.trim().toLowerCase();
            console.log(email_columna, '+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        }else
        
        if((data[`columna${count}`]+''.trim().toLowerCase().indexOf('password_') != -1)
        || (data[`columna${count}`]+''.trim().toLowerCase().indexOf('pas_') != -1)
        || (data[`columna${count}`]+''.trim().toLowerCase().indexOf('contrasena_') != -1)){
            // password_columna = data[`columna${count}`]+''.trim().toLowerCase();
            console.log(email_columna, '+=========================================================')
        }
        count ++;
    } 
    dataAux = dataAux.trim().slice(0,-1);
    cantidadDolar = cantidadDolar.trim().slice(0, -1);
    let palabra = nombre.split(' ')
    palabra = palabra.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    palabra = palabra.join('');

    let nodejsControllers = '';
    let usuario = '';

    if(nombre.trim().toLowerCase() === 'user' || nombre.trim().toLowerCase() === 'usuario'){
        validarUser = true;
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
    let {${dataAux}} = req.body;
    const tokens = await GenerarJWT(${email_columna});
    const salt = bcryptjs.genSaltSync()
    ${password_columna} = bcryptjs.hashSync(${password_columna}, salt);
    const sql = 'SELECT public."fn_post${palabra}"(${cantidadDolar})';

        pg.query(sql, [${dataAux}], async (err, result) => {
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
        console.log(err);
        return res.status(500).json({
            msg: 'internal server error'
        });
    }
    
}
const put${palabra} = async (req, res = response) => {
    
    try{    
    const pg = await db;
    const correo_user_logged = req.${nombre.trim().toLowerCase()}.${email_columna};
    let   {${dataAux}} = req.body;
    const tokens = await GenerarJWT(${email_columna});
    const salt = bcryptjs.genSaltSync();
    ${password_columna}  = bcryptjs.hashSync(${password_columna}, salt);
    const sql = 'SELECT public."fn_put${palabra} "(${cantidadDolar})';
        pg.query(sql, [${dataAux}, tokens, correo_user_logged], async(err, result) => {
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
                        msg: 'no ${found} found'
                    })
                }
            }
        });
    }catch(err){
        console.log(err);
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
    const { ${dataAux} } = req.body;        
    
    const sql = 'SELECT public."fn_post${palabra}"(${cantidadDolar})';

    pg.query(sql, [ ${dataAux}] , (err, result) => {
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
    const { ${dataAux} } = req.body;        
    const sql = 'SELECT public."fn_put${palabra}"(${cantidadDolar})';
    pg.query(sql, [ ${dataAux}id], (err, result) => {
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
    if(validarUser){
        nodejsControllers = usuario;    
    }
    return {
        nodejsControllers,
    }
}
