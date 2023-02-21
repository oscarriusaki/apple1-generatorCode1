import React from 'react';

export const NodejsControllers = (columna1 = '', columna2 = '') => {
    
    const nodejsControllers = `        
    const { db } = require("../database/config")
    const  get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}s = async (req, res) => {
        const pg = await db;
        const sql = 'SELECT * FROM public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}s"()';
        
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
                        msg: 'no ${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} found'
                    })
                }
            }
        })

    }
    const  get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} = async (req, res) => {
        const pg = await db;
        const { id } = req.params;
        const sql = 'SELECT * FROM public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"($1)';

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
                        msg: '${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} not found'
                    })
                }
            }
        })
    }
    const  post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} = async (req, res) => {
        const pg = await db;
        const { id_${columna1.toLowerCase()}, id_${columna2.toLowerCase()} } = req.body;        
        
        const sql = 'SELECT public."fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"($1,$2)';

        pg.query(sql, [id_${columna1.toLowerCase()}, id_${columna2.toLowerCase()}] , (err, result) => {
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
                    if(result.rows[0].fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}   === 'successfully registered'){
                        return res.status(200).json({
                            msg: result.rows[0].fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}    
                        })
                    }else{
                        return res.status(404).json({
                            msg: result.rows[0].fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}    
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
    const put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} = async (req, res) => {
        const pg = await db;
        const { id } = req.params;
        const { id_${columna1.toLowerCase()}, id_${columna2.toLowerCase()} } = req.body;        
        const sql = 'SELECT public."fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"($1,$2,$3)';
        pg.query(sql, [id_${columna1.toLowerCase()}, id_${columna2.toLowerCase()}, id], (err, result) => {
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
                    if(result.rows[0].fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} === 'successfully registered'){
                        return res.status(404).json({
                            msg: result.rows[0].fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}
                        })
                    }else{
                        return res.status(500).json({
                            msg: result.rows[0].fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}
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
    const delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} = async (req, res) => {
        const pg = await db;
        const { id } = req.params;
        const sql = 'SELECT public."fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"($1)';
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
                    if(result.rows[0].fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} === 'successfully eliminated'){
                        return res.status(200).json({
                            msg: result.rows[0].fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}
                        })
                    }else{
                        return res.status(404).json({
                            msg: result.rows[0].fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}
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
    module.exports = {
        get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}s,
        get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()},
        post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()},
        put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()},
        delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}
    }
        `
  return {
    nodejsControllers,
  }
}
