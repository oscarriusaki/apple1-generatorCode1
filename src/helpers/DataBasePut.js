import React from 'react';

export const DataBasePut = (data, nombre, data2) => {

    let nombreFuncion = nombre.trim().replace(/[\s_]+/g, ' ').split(' ');

    nombreFuncion = nombreFuncion.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    nombreFuncion = nombreFuncion.join('');
    
    let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_').toLowerCase();
    let nombreTabla2 = 'id_' + nombreTabla;

    let count3 = 1;
    let columnaRegistrarCampos = '';
    let columnaRegistrarCamposModify = '';
    let sqlUpdateColumns = '';

    for(const n in data2.inputForm){
        columnaRegistrarCampos += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
        columnaRegistrarCamposModify += 't_'+data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
        count3++;
    }

    let columnConTypeDate = '';
    let count = 1;
    let sqlPrimeraId2 = '';
    let sqlSegundaId2 = '';
    let sqlPrimeraCorreo2 = ''; 
    let sqlMediaCorreo2 = ''; 
    let sqlSegundaCorreo2 = ''; 
    let justType = ''; 
    
    for(const n in data2.inputForm){
        
        if(nombreTabla2 != data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') ){
            columnConTypeDate += 't_'+ data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') + ' '+ data2[n].trim() +', ';
            justType += data2[n].trim() + ', ';
            sqlUpdateColumns += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +' = '+ `t_${data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')}, `;
        }
            
        if((data[n]).length > 3 ){
            if((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()).slice(0, 3) === 'id_' && ((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()) != nombreTabla2)){
                
                sqlPrimeraId2 =sqlPrimeraId2 + `IF EXISTS (SELECT 1 FROM ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()).slice(3)} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} AND estadoeliminar = true ) THEN \n     ` ;
                sqlSegundaId2 = `
        ELSE
            RETURN '${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()).slice(3)} not found';
        END IF;`+ sqlSegundaId2;

            }else if(((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo_'+nombreTabla)||
                     (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo'))&&
                     ((nombreTabla === 'user')          || 
                     (nombreTabla === 'usuario')        || 
                     (nombreTabla === 'employee')       || 
                     (nombreTabla === 'empleado')       || 
                     (nombreTabla === 'administrator')  || 
                     (nombreTabla === 'administrador'))
            ){
                sqlPrimeraCorreo2 = sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} AND id_${nombreTabla} = t_id_update ) THEN \n     `; 
                sqlMediaCorreo2 = `ELSEIF NOT EXISTS ( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())}) THEN  \n    `;
                sqlSegundaCorreo2 = `
        ELSE
            RETURN '${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} already registered';
        END IF;\n` +  sqlSegundaCorreo2;
            }else if(((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email_'+nombreTabla) || 
                     (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email'))&&
                     ((nombreTabla === 'user')          || 
                     (nombreTabla === 'usuario')        || 
                     (nombreTabla === 'employee')       || 
                     (nombreTabla === 'empleado')       || 
                     (nombreTabla === 'administrator')  || 
                     (nombreTabla === 'administrador'))
            ) {
                sqlPrimeraCorreo2 = sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} AND id_${nombreTabla} = t_id_update ) THEN \n     `; 
                sqlMediaCorreo2 = `ELSEIF NOT EXISTS ( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())}) ) THEN  \n    `;
                sqlSegundaCorreo2 =  `
        ELSE
            RETURN '${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} already registered';
        END IF;\n` + sqlSegundaCorreo2;
            }
        }
        count ++;
    }
    columnConTypeDate = columnConTypeDate.trim().slice(0,-1);
    justType = justType.trim().slice(0, -1);
    sqlUpdateColumns = sqlUpdateColumns.trim().slice(0,-1);

    let datoTablaUsuario = '';
    let dataBasePut = '';

    if(nombreTabla.trim().toLowerCase() === 'user' || nombreTabla.trim().toLowerCase() === 'usuario'||
        nombreTabla.trim().toLowerCase() === 'employee' || nombreTabla.trim().toLowerCase() === 'empleado'||
        nombreTabla.trim().toLowerCase() === 'administrator' || nombreTabla.trim().toLowerCase() === 'administrador'){

    datoTablaUsuario = 
`-- FUNCTION: public.fn_put${nombreFuncion}(${justType}, integer, text)

-- DROP FUNCTION IF EXISTS public."fn_put${nombreFuncion}"(${justType}, integer ,text );

CREATE OR REPLACE FUNCTION public."fn_put${nombreFuncion}"(
    ${columnConTypeDate}, 
    t_id_update integer, t_tokens text )
    RETURNS character varying                                                                                              
    LANGUAGE 'plpgsql'                                        
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

DECLARE error_code character varying;

BEGIN
    
        IF EXISTS (SELECT 1 FROM ${nombreTabla} WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true) THEN
            ${(sqlPrimeraCorreo2) && (sqlPrimeraCorreo2) } 
                UPDATE ${nombreTabla}  
                SET ${sqlUpdateColumns}, tokens = t_tokens
                WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true;
                RETURN 'successfully updated';
            ${(sqlMediaCorreo2) && (sqlMediaCorreo2)}
            ${(sqlMediaCorreo2) && (` 
                UPDATE ${nombreTabla}
                SET ${sqlUpdateColumns}, tokens = t_tokens
                WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true;
                RETURN 'successfully updated';
            `)}
            ${(sqlSegundaCorreo2) && sqlSegundaCorreo2} 
        ELSE
            RETURN '${nombreTabla} not found';
        END IF;
    EXCEPTION
    WHEN OTHERS THEN
        error_code = SQLSTATE;
        RETURN 'Error: '||error_code;
    
END;
$BODY$;

ALTER FUNCTION public."fn_put${nombreFuncion}"(${justType}, integer ,text )
    OWNER TO postgres;`;
    }else{
        
    dataBasePut = 
`-- FUNCTION: public.fn_put${nombreFuncion}(${justType}, integer)

-- DROP FUNCTION IF EXISTS public."fn_put${nombreFuncion}"(${justType}, integer);

CREATE OR REPLACE FUNCTION public."fn_put${nombreFuncion}"(
    ${columnConTypeDate},
    t_id_update integer)
    RETURNS character varying                                                                                              
    LANGUAGE 'plpgsql'                                        
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

DECLARE error_code character varying;

BEGIN
    ${(sqlPrimeraId2) && (sqlPrimeraId2)} 
    IF EXISTS (SELECT 1 FROM ${nombreTabla} WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true) THEN
        ${(sqlPrimeraCorreo2) && (sqlPrimeraCorreo2) } 
            UPDATE ${nombreTabla}  
            SET ${sqlUpdateColumns}
            WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true;
            RETURN 'successfully updated';
        ${(sqlMediaCorreo2) && (sqlMediaCorreo2)}
        ${(sqlMediaCorreo2) && (` 
            UPDATE ${nombreTabla}  
            SET ${sqlUpdateColumns}
            WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true;
            RETURN 'successfully updated';
        `)}
        ${(sqlSegundaCorreo2) && sqlSegundaCorreo2} 
    ELSE
        RETURN '${nombreTabla} not found';
    END IF;
    ${(sqlSegundaId2) && sqlSegundaId2}
EXCEPTION
WHEN OTHERS THEN
    error_code = SQLSTATE;
    RETURN 'Error: '||error_code;
END;
$BODY$;

ALTER FUNCTION public."fn_put${nombreFuncion}"(${justType}, integer)
    OWNER TO postgres;`;
    }
    if(nombreTabla.trim().toLowerCase() === 'user' || nombreTabla.trim().toLowerCase() === 'usuario'||
        nombreTabla.trim().toLowerCase() === 'employee' || nombreTabla.trim().toLowerCase() === 'empleado'||
        nombreTabla.trim().toLowerCase() === 'administrator' || nombreTabla.trim().toLowerCase() === 'administrador'){
        dataBasePut = datoTablaUsuario;
    }
    return {
        dataBasePut,
    }

}