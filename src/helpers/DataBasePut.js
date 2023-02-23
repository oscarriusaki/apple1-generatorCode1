import React from 'react'

export const DataBasePut = (data, nombre, data2) => {

    let dataAux = '';
    let count = 1;
    for(const n in data2.inputForm){
      dataAux += data[`columna${count}`];
    //   console.log(data[`columna${count}`] +':'+ data2[`columna${count}`])
      count ++;
    }

    const dataBasePut = `
    -- FUNCTION: public.fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}(integer, integer, integer)

    -- DROP FUNCTION IF EXISTS public."fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer, integer, integer);
    
    CREATE OR REPLACE FUNCTION public."fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(
        t_id_${columna1.toLowerCase()} integer,
        t_id_${columna2.toLowerCase()} integer,
        t_id_update integer)
        RETURNS character varying
        LANGUAGE 'plpgsql'
        COST 100
        VOLATILE PARALLEL UNSAFE
    AS $BODY$
    
    DECLARE error_code character varying;
    
    BEGIN
        IF EXISTS (SELECT 1 FROM ${columna1.toLowerCase()}_${columna2.toLowerCase()}  WHERE id_${columna1.toLowerCase()}_${columna2.toLowerCase()}  = t_id AND estadoeliminar = true )THEN
            IF EXISTS (SELECT 1 FROM ${columna1.toLowerCase()} WHERE id_${columna1.toLowerCase()} = t_id_${columna1.toLowerCase()} AND estadoeliminar = true )THEN
                IF (SELECT 1 FROM ${columna2.toLowerCase()} WHERE id_${columna2.toLowerCase()} = t_id_${columna2.toLowerCase()} AND estadoeliminar = true) THEN
                    UPDATE ${columna1.toLowerCase()}_${columna2.toLowerCase()}  
                    SET id_${columna1.toLowerCase()} = t_id_${columna1.toLowerCase()}, id_${columna2.toLowerCase()}= t_id_${columna2.toLowerCase()}, estadoeliminar= true
                    WHERE id_${columna1.toLowerCase()}_${columna2.toLowerCase()}  = t_id_update AND estadoeliminar = true;
                    RETURN 'successfully updated';
                ELSE
                    RETURN '${columna2.toLowerCase()} not found';
                END IF;
            ELSE
                RETURN '${columna1.toLowerCase()} not found';
            END IF;	
        ELSE
            RETURN '${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()} not found';
        END IF;
        EXCEPTION
        WHEN OTHERS THEN
            error_code = SQLSTATE;
            RETURN 'Error: '||error_code;
        
    END;
    $BODY$;
    
    ALTER FUNCTION public."fn_put${columna1.charAt(0).toUpperCase() + columna1.slice(1).toLowerCase() + columna2.charAt(0).toUpperCase() + columna2.slice(1).toLowerCase()}"(integer, integer, integer)
        OWNER TO postgres;
    `;
    return {
        dataBasePut,
    }
}
