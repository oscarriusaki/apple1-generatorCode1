import React from 'react';

export const DataBasePut = (data, nombre, data2) => {

    let nombreFuncion = nombre.split(' ');
    nombreFuncion = nombreFuncion.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    nombreFuncion = nombreFuncion.join('');
    
    let nombreTabla = nombre.split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_');
    let nombreTabla2 = 'id_' + nombreTabla;

    let count3 = 1;
    let columnaRegistrarCampos = '';
    let columnaRegistrarCamposModify = '';
    let sqlUpdateColumns = '';

    for(const n in data2.inputForm){
        columnaRegistrarCampos += data[`columna${count3}`] +', ';
        columnaRegistrarCamposModify += 't_'+data[`columna${count3}`] +', ';
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
        
        if(nombreTabla2 != data[`columna${count}`]+''.trim() ){
            columnConTypeDate += 't_'+ data[`columna${count}`]+''.trim() + ' '+ data2[`columna${count}`]+''.trim() +', ';
            justType += data2[`columna${count}`]+''.trim() + ', ';
            sqlUpdateColumns += data[`columna${count}`] +' = '+ `t_${data[`columna${count}`]}, `;
        }
            
        if((data[`columna${count}`]+'').length > 3 ){
            if((data[`columna${count}`]+''.trim().toLowerCase()).slice(0, 3) === 'id_' && ((data[`columna${count}`]+''.trim().toLowerCase()) != nombreTabla2)){
                
                sqlPrimeraId2 =sqlPrimeraId2 + `IF EXISTS (SELECT 1 FROM ${(data[`columna${count}`]+''.trim().toLowerCase()).slice(3)} WHERE ${(data[`columna${count}`].trim().toLowerCase())} = t_${(data[`columna${count}`]+''.trim().toLowerCase())} AND estadoeliminar = true ) THEN \n     ` ;
                sqlSegundaId2 = `
        ELSE
            RETURN '${(data[`columna${count}`]+''.trim().toLowerCase()).slice(3)} not found';
        END IF;`+ sqlSegundaId2;

            }else if((data[`columna${count}`]+''.trim()+''.toLowerCase()).slice(0, 7) === 'correo_'){
                sqlPrimeraCorreo2 = sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${(data[`columna${count}`]+''.trim().toLowerCase()).slice(7)} WHERE ${(data[`columna${count}`]+''.trim().toLowerCase())} = e_${(data[`columna${count}`]+''.trim().toLowerCase())} AND id_${nombreTabla} = t_id_update ) THEN \n     `; 
                sqlMediaCorreo2 = `ELSEIF NOT EXISTS ( SELECT 1 FROM ${nombreTabla} WHERE ${(data[`columna${count}`]+''.trim().toLowerCase())} = e_${(data[`columna${count}`]+''.trim().toLowerCase())}) ) THEN  \n    `;
                sqlSegundaCorreo2 = `
        ELSE
            RETURN '${(data[`columna${count}`]+''.trim().toLowerCase())} already registered';
        END IF;\n` +  sqlSegundaCorreo2;
            }else if((data[`columna${count}`]+''.trim()+''.toLowerCase()).slice(0, 6) === 'email_') {
                sqlPrimeraCorreo2 = sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${(data[`columna${count}`]+''.trim().toLowerCase()).slice(6)} WHERE ${(data[`columna${count}`]+''.trim().toLowerCase())} = e_${(data[`columna${count}`]+''.trim().toLowerCase())} AND id_${nombreTabla} = t_id_update ) THEN \n     `; 
                sqlMediaCorreo2 = `ELSEIF NOT EXISTS ( SELECT 1 FROM ${nombreTabla} WHERE ${(data[`columna${count}`]+''.trim().toLowerCase())} = e_${(data[`columna${count}`]+''.trim().toLowerCase())}) ) THEN  \n    `;
                sqlSegundaCorreo2 =  `
        ELSE
            RETURN '${(data[`columna${count}`]+''.trim().toLowerCase())} already registered';
        END IF;\n` + sqlSegundaCorreo2;
            }
        }
        count ++;
    }
   /*  sqlPrimeraCorreo2 = sqlPrimeraCorreo2.trim().slice(0,-2);
    sqlMediaCorreo2 = sqlMediaCorreo2.trim().slice(0,-2);
    sqlSegundaCorreo2 = sqlSegundaCorreo2.trim().slice(0,-2); */
    columnConTypeDate = columnConTypeDate.trim().slice(0,-1);
    justType = justType.trim().slice(0, -1);
    sqlUpdateColumns = sqlUpdateColumns.trim().slice(0,-1);

    let datoTablaUsuario = '';
    let dataBasePut = '';

    if(nombreTabla.trim().toLowerCase() === 'user' || nombreTabla.trim().toLowerCase() === 'usuario'||
        nombreTabla.trim().toLowerCase() === 'employee' || nombreTabla.trim().toLowerCase() === 'empleado'||
        nombreTabla.trim().toLowerCase() === 'administrator' || nombreTabla.trim().toLowerCase() === 'administrador'){
    // if(nombreTabla === 'user' || nombreTabla === 'usuario'){

    datoTablaUsuario = `
    -- FUNCTION: public.fn_put${nombreFuncion}(${justType},  integer, text)

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
                RETURN '${nombreFuncion.trim().toLowerCase()} not found';
            END IF;
        EXCEPTION
        WHEN OTHERS THEN
            error_code = SQLSTATE;
            RETURN 'Error: '||error_code;
        
    END;
    $BODY$;

    ALTER FUNCTION public."fn_put${nombreFuncion}"(${justType}, integer ,text )
        OWNER TO postgres;
    `;
    }else{
        
    dataBasePut = `
    -- FUNCTION: public.fn_put${nombreFuncion}(${justType}, integer)

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
            RETURN '${nombreFuncion.trim().toLowerCase()} not found';
        END IF;
        ${(sqlSegundaId2) && sqlSegundaId2}
    EXCEPTION
    WHEN OTHERS THEN
        error_code = SQLSTATE;
        RETURN 'Error: '||error_code;
    END;
    $BODY$;

    ALTER FUNCTION public."fn_put${nombreFuncion}"(${justType}, integer)
        OWNER TO postgres;
    `;
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
/* POR SI ACASO SE ENCESITA
${(sqlPrimeraId2) && (sqlPrimeraId2)} 
${(sqlSegundaId2) && sqlSegundaId2} */