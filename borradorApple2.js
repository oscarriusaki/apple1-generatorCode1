
    let nodejsControllers = `      
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
const  get${palabra} = async (req, res) => {
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
const  post${palabra} = async (req, res) => {
    const pg = await db;
    const { ${dataAux} } = req.body;        
    
    const sql = 'SELECT public."fn_post${palabra}"($1,$2)';

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
    const sql = 'SELECT public."fn_put${palabra}"($1,$2,$3)';
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
                if(result.rows[0].fn_put${palabra} === 'successfully registered'){
                    return res.status(404).json({
                        msg: result.rows[0].fn_put${palabra}
                    })
                }else{
                    return res.status(500).json({
                        msg: result.rows[0].fn_put${palabra}
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
                return res.status(500).json({
                    msg: 'there was an error in the query'
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