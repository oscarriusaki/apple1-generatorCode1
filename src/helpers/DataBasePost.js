import React from 'react';

export const DataBasePost = (data, nombre, data2) => {

    let nombreFuncion = nombre.trim().replace(/[\s_]+/g, ' ').split(' ');

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
    let dollars = ''; 
    let count = 0;

    for(const n in data2.inputForm){
        if(auxNombreTabla != data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')){
            columnaRegistrarCampos += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
            columnaRegistrarCamposModify += 't_'+data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
            columnConTypeDate += 't_'+ data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') + ' '+ data2[n].trim() +', ';
            justType += data2[n].trim() + ', ';
            count++;
            dollars += ` $${count},`
        } 
    }
    
    dollars = dollars.trim().slice(0, -1);
    columnaRegistrarCampos = columnaRegistrarCampos.trim().slice(0, -1);
    columnaRegistrarCamposModify = columnaRegistrarCamposModify.trim().slice(0, -1);
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
        if((data[n]).length > 3 ){
            if(((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()).slice(0, 3) === 'id_') && (auxNombreTabla != (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()))){
                
                sqlPrimeraId2 =sqlPrimeraId2 + `IF EXISTS (SELECT 1 FROM ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()).slice(3)} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} AND estadoeliminar = 'TRUE' ) THEN \n     ` ;
                sqlSegundaId2 = `
        ELSE
            RETURN '${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase()).slice(3)} not found';
        END IF;`+ sqlSegundaId2;

            }else if(((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo_'+nombreTabla)||
                     (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo')) && 
                     ((nombreTabla === 'user')          || 
                     (nombreTabla === 'usuario')        || 
                     (nombreTabla === 'employee')       || 
                     (nombreTabla === 'empleado')       || 
                     (nombreTabla === 'administrator')  || 
                     (nombreTabla === 'administrador'))
            ){
                sqlPrimeraCorreo2 =sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())}) THEN \n     `; 
                sqlSegundaCorreo2 = `
        ELSE
            RETURN '${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} already registered';
        END IF;` +  sqlSegundaCorreo2;
            }else if(((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email_'+nombreTabla) ||
                     (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email'))&&
                     ((nombreTabla === 'user')          || 
                     (nombreTabla === 'usuario')        || 
                     (nombreTabla === 'employee')       || 
                     (nombreTabla === 'empleado')       || 
                     (nombreTabla === 'administrator')  || 
                     (nombreTabla === 'administrador'))
            ) {
                sqlPrimeraCorreo2 =sqlPrimeraCorreo2 + `IF NOT EXISTS( SELECT 1 FROM ${nombreTabla} WHERE ${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} = t_${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())}) THEN \n     `; 
                sqlSegundaCorreo2 =  `
        ELSE
            RETURN '${(data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase())} already registered';
        END IF;` + sqlSegundaCorreo2;
            }
        } 
    }
    columnConTypeDate = columnConTypeDate.trim().slice(0,-1);
    justType = justType.trim().slice(0, -1);
    let userDateSql = '';
    let dataBasePost = ''; 

    if(nombreTabla.trim().toLowerCase() === 'user' || nombreTabla.trim().toLowerCase() === 'usuario'||
        nombreTabla.trim().toLowerCase() === 'employee' || nombreTabla.trim().toLowerCase() === 'empleado'||
        nombreTabla.trim().toLowerCase() === 'administrator' || nombreTabla.trim().toLowerCase() === 'administrador'){
    // if(nombreTabla === 'user' || nombreTabla === 'usuario') {
    
    count ++;
    dollars += `, $${count}`;
    userDateSql = 
`----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                              FECHA: ${new Date()} 
-- MÓDULO: ${nombreTabla}                   PROYECTO: TIENDA                ACTIVIDAD: set-app-1
-- CREACIÓN DE LA FUNCION: fn_post${nombreFuncion}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

-- SELECT * FROM public."fn_post${nombreFuncion}"(${dollars});
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- Se crea la funcion fn_put${nombreFuncion} para registrar en la tabla ${nombreTabla}.
----------------------------------------------------------------------------------------------------------------------------

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
    OWNER TO postgres;`;
    }else{

    dataBasePost = 
`----------------------------------------------------------------------------------------------------------------------------
-- Creado: Oscar Laura Aguirre                                              Fecha: ${new Date()} 
-- Módulo: ${nombreTabla}                   Proyecto: TIENDA                Actividad: set-app-1
-- Creación de la funcion fn_post${nombreFuncion}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- sentencias de apoyo                                                                  

-- SELECT * FROM public."fn_post${nombreFuncion}"(${dollars.trim().slice(0, -1)})
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- Se crea la funcion fn_put${nombreFuncion} para registrar en la tabla ${nombreTabla}.
----------------------------------------------------------------------------------------------------------------------------

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
    OWNER TO postgres;`;
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
