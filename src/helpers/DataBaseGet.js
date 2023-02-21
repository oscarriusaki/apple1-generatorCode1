import React from 'react'

export const DataBaseGet = (columna1='', columna2='') => {

    const dataBaseGet = `
    -- FUNCTION: public.fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}(integer)

    -- DROP FUNCTION IF EXISTS public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer);

    CREATE OR REPLACE FUNCTION public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(
        t_id integer)
        RETURNS TABLE(id_${columna1.toLowerCase()}_${columna2.toLowerCase()} integer, id_${columna1.toLowerCase()} integer, id_${columna2.toLowerCase()} integer, estadoeliminar boolean) 
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE PARALLEL UNSAFE
        ROWS 1000

    AS $BODY$
    BEGIN
        
        RETURN QUERY
        SELECT U.* 
        FROM ${columna1.toLowerCase()}_${columna2.toLowerCase()} u 
        WHERE u.estadoeliminar = true AND u.id_${columna1.toLowerCase()}_${columna2.toLowerCase()} = t_id;
        
    END;
    $BODY$;

    ALTER FUNCTION public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer)
        OWNER TO postgres;
    `;
    return {
        dataBaseGet,
    }
}
