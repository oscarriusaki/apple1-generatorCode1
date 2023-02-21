import React from 'react'

export const DataBaseDelete = (columna1='', columna2='') => {

    const dataBaseDelete = `
    -- FUNCTION: public.fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}(integer)

    -- DROP FUNCTION IF EXISTS public."fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer);
    
    CREATE OR REPLACE FUNCTION public."fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(
        t_id integer)
        RETURNS character varying
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE PARALLEL UNSAFE
    AS $BODY$
    
    DECLARE error_code character varying;
    
    BEGIN
        IF EXISTS (SELECT 1 FROM ${columna1.toLowerCase()}_${columna2.toLowerCase()} WHERE id_${columna1.toLowerCase()}_${columna2.toLowerCase()}  = t_id AND estadoeliminar = true )THEN
            UPDATE ${columna1.toLowerCase()}_${columna2.toLowerCase()}  SET estadoeliminar = false 
            WHERE id_${columna1.toLowerCase()}_${columna2.toLowerCase()}  = t_id AND estadoeliminar = true;
            RETURN 'successfully eliminated';
        ELSE
            RETURN '${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} not found';
        END IF;
        EXCEPTION
        WHEN OTHERS THEN
            error_code = SQLSTATE;
            RETURN 'Error: '||error_code;
        
    END;
    $BODY$;
    
    ALTER FUNCTION public."fn_delete${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer)
        OWNER TO postgres;
    `;
    return {
        dataBaseDelete
    }
}
