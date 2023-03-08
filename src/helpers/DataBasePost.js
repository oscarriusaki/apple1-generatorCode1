import React from 'react';

export const DataBasePost = (data, nombre, data2) => {
    let nombreFuncion = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreFuncion = nombreFuncion.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    nombreFuncion = nombreFuncion.join('');
    
    let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    let auxNombreTabla = '';
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_').toLowerCase();
    auxNombreTabla = 'id_' + nombreTabla;
     
    let columnaRegistrarCampos = '';
    let columnaRegistrarCamposModify = '';
    let columnConTypeDate = '';
    let justType = ''; 
    for(const n in data2.inputForm){
        if(auxNombreTabla != data[n].trim()){
            columnaRegistrarCampos += data[n].trim() +', ';
            columnaRegistrarCamposModify += 't_'+data[n].trim() +', ';
            columnConTypeDate += 't_'+ data[n].trim() + ' '+ data2[n].trim() +', ';
            justType += data2[n].trim() + ', ';
        } 
    }
    columnaRegistrarCampos = columnaRegistrarCampos.trim().slice(0, -1)
    columnaRegistrarCamposModify = columnaRegistrarCamposModify.trim().slice(0, -1)
    let sql = `
            INSERT INTO ${nombreTabla.trim()} (${columnaRegistrarCampos.trim()}, tokens) 
            VALUES (${columnaRegistrarCamposModify}, t_tokens);
            RETURN 'successfully registered';`;
    let sql2 = `
            INSERT INTO ${nombreTabla.trim()} (${columnaRegistrarCampos.trim()}) 
            VALUES (${columnaRegistrarCamposModify});
            RETURN 'successfully registered';`;
 
    let sqlPrimeraId2 = '';
    let sqlSegundaId2 = '';
    let sqlPrimeraCorreo2 = ''; 
    let sqlSegundaCorreo2 = '';
    
    for(const n in data2.inputForm){
        // columnConTypeDate += 't_'+ data[`columna${count}`].trim() + ' '+ data2[`columna${count}`].trim() +', ';
        // justType += data2[`columna${count}`].trim() + ', ';
        if((data[n]).length > 3 ){
            if(((data[n].trim().toLowerCase()).slice(0, 3) === 'id_') && (auxNombreTabla != (data[n].trim().toLowerCase()))){
                
                sqlPrimeraId2 =sqlPrimeraId2 + `IF EXISTS (SELECT 1 FROM ${(data[n].trim().toLowerCase()).slice(3)} WHERE ${(data[n].trim().toLowerCase())} = t_${(data[n].trim().toLowerCase())} AND estadoeliminar = true ) THEN \n     ` ;
                sqlSegundaId2 = `
        ELSE
            RETURN '${(data[n].trim().toLowerCase()).slice(3)} not found';
        END IF;`+ sqlSegundaId2;

            }else if(((data[n].trim().toLowerCase() === 'correo_'+nombreTabla)||
                     (data[n].trim().toLowerCase() === 'correo')) && 
                     ((nombreTabla === 'user')          || 
                     (nombreTabla === 'usuario')        || 
                     (nombreTabla === 'employee')       || 
                     (nombreTabla === 'empleado')       || 
                     (nombreTabla === 'administrator')  || 
                     (nombreTabla === 'administrador'))
            ){
                sqlPrimeraCorreo2 =sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().toLowerCase())} = t_${(data[n].trim().toLowerCase())}) THEN \n     `; 
                sqlSegundaCorreo2 = `
        ELSE
            RETURN '${(data[n].trim().toLowerCase())} already registered';
        END IF;` +  sqlSegundaCorreo2;
            }else if(((data[n].trim().toLowerCase() === 'email_'+nombreTabla) ||
                     (data[n].trim().toLowerCase() === 'email'))&&
                     ((nombreTabla === 'user')          || 
                     (nombreTabla === 'usuario')        || 
                     (nombreTabla === 'employee')       || 
                     (nombreTabla === 'empleado')       || 
                     (nombreTabla === 'administrator')  || 
                     (nombreTabla === 'administrador'))
            ) {
                sqlPrimeraCorreo2 =sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().toLowerCase())} = t_${(data[n].trim().toLowerCase())}) THEN \n     `; 
                sqlSegundaCorreo2 =  `
        ELSE
            RETURN '${(data[n].trim().toLowerCase())} already registered';
        END IF;` + sqlSegundaCorreo2;
            }
        } 
    }
    // sqlPrimeraId2 = sqlPrimeraId2.trim().slice(0,-2);
    // sqlPrimeraCorreo2 = sqlPrimeraCorreo2.trim().slice(0,-2);
    columnConTypeDate = columnConTypeDate.trim().slice(0,-1);
    justType = justType.trim().slice(0, -1);
    let userDateSql = '';
    let dataBasePost = ''; 

    if(nombreTabla.trim().toLowerCase() === 'user' || nombreTabla.trim().toLowerCase() === 'usuario'||
        nombreTabla.trim().toLowerCase() === 'employee' || nombreTabla.trim().toLowerCase() === 'empleado'||
        nombreTabla.trim().toLowerCase() === 'administrator' || nombreTabla.trim().toLowerCase() === 'administrador'){
    // if(nombreTabla === 'user' || nombreTabla === 'usuario') {
        userDateSql = `
    -- FUNCTION: public.fn_post${nombreFuncion}(${justType}, text)

    -- DROP FUNCTION IF EXISTS public."fn_post${nombreFuncion}"(${justType}, text);

    CREATE OR REPLACE FUNCTION public."fn_post${nombreFuncion}"(
        ${columnConTypeDate}, t_tokens text
        )
        RETURNS character varying
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE PARALLEL UNSAFE
    AS $BODY$

    DECLARE error_code character varying;

    BEGIN
        ${(sqlPrimeraId2) && (sqlPrimeraId2)} 
        ${(sqlPrimeraCorreo2) && (sqlPrimeraCorreo2) } 
            ${ sql }
        ${(sqlSegundaCorreo2) && sqlSegundaCorreo2} 
        ${(sqlSegundaId2) && sqlSegundaId2}
        EXCEPTION
        WHEN OTHERS THEN
            error_code = SQLSTATE;
            RETURN 'Error: '||error_code;
    END;
    $BODY$;

    ALTER FUNCTION public."fn_post${nombreFuncion}"(${justType}, text)
        OWNER TO postgres;
    `;
    }else{

    dataBasePost = `
    -- FUNCTION: public.fn_post${nombreFuncion}(${justType})

    -- DROP FUNCTION IF EXISTS public."fn_post${nombreFuncion}"(${justType});

    CREATE OR REPLACE FUNCTION public."fn_post${nombreFuncion}"(
        ${columnConTypeDate}
        )
        RETURNS character varying
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE PARALLEL UNSAFE
    AS $BODY$

    DECLARE error_code character varying;

    BEGIN
        ${(sqlPrimeraId2) && (sqlPrimeraId2)} 
            ${(sqlPrimeraCorreo2) && (sqlPrimeraCorreo2) } 
                ${ sql2 }
            ${(sqlSegundaCorreo2) && sqlSegundaCorreo2} 
        ${(sqlSegundaId2) && sqlSegundaId2}
        EXCEPTION
        WHEN OTHERS THEN
            error_code = SQLSTATE;
            RETURN 'Error: '||error_code;
    END;
    $BODY$;

    ALTER FUNCTION public."fn_post${nombreFuncion}"(${justType})
        OWNER TO postgres;
    `;
    }
    if(nombreTabla.trim().toLowerCase() === 'user' || nombreTabla.trim().toLowerCase() === 'usuario'||
        nombreTabla.trim().toLowerCase() === 'employee' || nombreTabla.trim().toLowerCase() === 'empleado'||
        nombreTabla.trim().toLowerCase() === 'administrator' || nombreTabla.trim().toLowerCase() === 'administrador'){
        dataBasePost = userDateSql;
    }
  return {
    dataBasePost
  }
}
