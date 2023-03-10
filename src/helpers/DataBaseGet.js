import React from 'react';

export const DataBaseGet = (data, nombre, data2) => {

    let dataAux = '';
    let count = 1;
    for(const n in data2.inputForm){
        dataAux += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '');
        count ++;
    }

    let palabra = nombre.trim().replace(/[\s_]+/g, ' ').split(' ');
    palabra = palabra.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    palabra = palabra.join('');

    let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_')

    const dataBaseGet = 
`----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                               FECHA: ${new Date()} 
-- MÓDULO: ${nombreTabla}                   PROYECTO: TIENDA               ACTIVIDAD: file
-- CREACIÓN DE LA FUNCION: fn_get${palabra}                                                   
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

-- SELECT * FROM public."fn_get${palabra}"($1);
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- 
----------------------------------------------------------------------------------------------------------------------------

-- FUNCTION: public.fn_get${palabra}(integer)

-- DROP FUNCTION IF EXISTS public."fn_get${palabra}"(integer);

CREATE OR REPLACE FUNCTION public."fn_get${palabra}"(
    t_id_search integer)
    RETURNS SETOF ${nombreTabla}
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT *
    FROM ${nombreTabla} 
    WHERE id_${nombreTabla} = t_id_search AND estadoeliminar = true;
END;
$BODY$;

ALTER FUNCTION public."fn_get${palabra}"(integer)
    OWNER TO postgres;`;
    return {
        dataBaseGet,
    }
}
