import React from 'react'

export const DataBaseDelete = (data, nombre, data2) => {
    
    let dataAux = '';
    let count = 1;
    for( const n in data2.inputForm ){
        dataAux += data[`columna${count}`] +', ';
        // console.log(data[`columna${count}`] +':'+data2[`columna${count}`])
        count ++;
    } 

    const dataBaseDelete = `
    -- FUNCTION: public.fn_delete${ dataAux}(integer)

    -- DROP FUNCTION IF EXISTS public."fn_delete${ dataAux}"(integer);
    
    CREATE OR REPLACE FUNCTION public."fn_delete${ dataAux}"(
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
            RETURN '${ dataAux} not found';
        END IF;
        EXCEPTION
        WHEN OTHERS THEN
            error_code = SQLSTATE;
            RETURN 'Error: '||error_code;
        
    END;
    $BODY$;
    
    ALTER FUNCTION public."fn_delete${ dataAux}"(integer)
        OWNER TO postgres;
    `;
    return {
        dataBaseDelete
    }
}
