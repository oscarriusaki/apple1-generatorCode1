import React from 'react'

export const DataBaseGets = (columna1='', columna2='') => {
  
    const dataBaseGets = `
    -- FUNCTION: public.fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}s()

    -- DROP FUNCTION IF EXISTS public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}s"();

    CREATE OR REPLACE FUNCTION public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}s"(
        )
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
        WHERE u.estadoeliminar = true
        ORDER BY id_${columna1.toLowerCase()}_${columna2.toLowerCase()} DESC;
        
    END;
    $BODY$;

    ALTER FUNCTION public."fn_get${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}s"()
        OWNER TO postgres;
    `;
  return {
    dataBaseGets
  }
}
