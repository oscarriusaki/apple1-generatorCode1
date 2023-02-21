import React from 'react';

export const DataBasePost = (columna1='', columna2='') => {

    const dataBasePost = `
    -- FUNCTION: public.fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}(integer, integer)

    -- DROP FUNCTION IF EXISTS public."fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer, integer);

    CREATE OR REPLACE FUNCTION public."fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(
        t_id_${columna1.toLowerCase()} integer,
        t_id_${columna2.toLowerCase()}  integer)
        RETURNS character varying
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE PARALLEL UNSAFE
    AS $BODY$

    DECLARE error_code character varying;

    BEGIN
        
        IF EXISTS (SELECT 1 FROM ${columna1.toLowerCase()} WHERE id_${columna1.toLowerCase()} = t_id_${columna1.toLowerCase()} AND estadoeliminar = true )THEN
            IF (SELECT 1 FROM ${columna2.toLowerCase()}  WHERE id_${columna2.toLowerCase()}  = t_id_${columna2.toLowerCase()}  AND estadoeliminar = true) THEN
                INSERT INTO ${columna1.toLowerCase()}_${columna2.toLowerCase()} (id_${columna1.toLowerCase()}, id_${columna2.toLowerCase()} , estadoeliminar) VALUES (t_id_${columna1.toLowerCase()}, t_id_${columna2.toLowerCase()} , true);
                RETURN 'successfully registered';
            ELSE
                RETURN '${columna2.toLowerCase()}  not found';
            END IF;
        ELSE
            RETURN '${columna1.toLowerCase()} not found';
        
        END IF;
        EXCEPTION
        WHEN OTHERS THEN
            error_code = SQLSTATE;
            RETURN 'Error: '||error_code;
        
    END;
    $BODY$;

    ALTER FUNCTION public."fn_post${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer, integer)
        OWNER TO postgres;
`;
  return {
    dataBasePost
  }
}
