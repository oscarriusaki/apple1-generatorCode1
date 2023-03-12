import React from 'react'

export const DataBaseDelete = (data, nombre, data2) => {
    
    let nombreFuncion = nombre.trim().replace(/[\s_]+/g, ' ').split(' ');
    nombreFuncion = nombreFuncion.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    nombreFuncion = nombreFuncion.join('');
    
    let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_');
    
    let count3 = 1;
    let columnaRegistrarCampos = '';
    let columnaRegistrarCamposModify = '';
    for(const n in data2.inputForm){
        columnaRegistrarCampos += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
        columnaRegistrarCamposModify += 't_'+data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
        count3++;
    }

    let sql = `
            UPDATE ${nombreTabla} 
            SET estadoeliminar = false 
            WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true;
            RETURN 'successfully eliminated';`;

    let columnConTypeDate = '';
    let count = 1;
    let sqlPrimeraId2 = '';
    let sqlSegundaId2 = '';
    let sqlPrimeraCorreo2 = ''; 
    let sqlSegundaCorreo2 = ''; 
    let justType = ''; 

    for(const n in data2.inputForm){
        columnConTypeDate += 't_'+ data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') + ' '+ data2[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +', ';
        justType += data2[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') + ', ';
        count ++;
    }
    columnConTypeDate = columnConTypeDate.trim().slice(0,-1);
    justType = justType.trim().slice(0, -1);
    const dataBaseDelete = 
`----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                              FECHA: ${new Date()}
-- MÓDULO: ${nombreTabla}                    PROYECTO: TIENDA               ACTIVIDAD: file
-- CREACIÓN DE LA FUNCION: fn_delete ${ nombreFuncion}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

-- SELECT public."fn_delete${ nombreFuncion}"($1);
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- 
----------------------------------------------------------------------------------------------------------------------------

-- FUNCTION: public.fn_delete${ nombreFuncion}(integer);

-- DROP FUNCTION IF EXISTS public."fn_delete${ nombreFuncion}"(integer);

CREATE OR REPLACE FUNCTION public."fn_delete${ nombreFuncion}"(
    t_id_update integer)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

DECLARE error_code character varying;

BEGIN

    IF EXISTS (SELECT 1 FROM ${nombreTabla} WHERE id_${nombreTabla} = t_id_update AND estadoeliminar = true ) THEN
        ${ sql }
    ELSE
        RETURN '${nombreTabla} not found';
    END IF;
    
    EXCEPTION
    WHEN OTHERS THEN
        error_code = SQLSTATE;
        RETURN 'Error: '||error_code;
END;
$BODY$;

ALTER FUNCTION public."fn_delete${nombreFuncion}"(integer)
    OWNER TO postgres;`;
    return {
        dataBaseDelete
    }
}
