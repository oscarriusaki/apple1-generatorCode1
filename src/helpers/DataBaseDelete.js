import React from 'react'

export const DataBaseDelete = (data, nombre, data2) => {
    
    let nombreFuncion = nombre.split(' ');
    nombreFuncion = nombreFuncion.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    nombreFuncion = nombreFuncion.join('');
    
    let nombreTabla = nombre.split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_');
    
    
    let count3 = 1;
    let columnaRegistrarCampos = '';
    let columnaRegistrarCamposModify = '';
    for(const n in data2.inputForm){
        columnaRegistrarCampos += data[`columna${count3}`] +', ';
        columnaRegistrarCamposModify += 't_'+data[`columna${count3}`] +', ';
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
        columnConTypeDate += 't_'+ data[`columna${count}`]+''.trim() + ' '+ data2[`columna${count}`]+''.trim() +', ';
        justType += data2[`columna${count}`]+''.trim() + ', ';
        /* if((data[`columna${count}`]+'').length > 3 ){
            if((data[`columna${count}`]+''.trim().toLowerCase()).slice(0, 3) === 'id_'){
                
                sqlPrimeraId2 =`IF EXISTS (SELECT 1 FROM ${(data[`columna${count}`]+''.trim().toLowerCase()).slice(3)} WHERE ${(data[`columna${count}`].trim().toLowerCase())} = t_${(data[`columna${count}`].trim().toLowerCase())} AND estadoeliminar = true ) THEN ` ;
                sqlSegundaId2 = `
        ELSE
            RETURN '${(data[`columna${count}`].trim().toLowerCase()).slice(3)} not found';
        END IF;`;

            }
        } */
        count ++;
    }
    columnConTypeDate = columnConTypeDate.trim().slice(0,-1);
    justType = justType.trim().slice(0, -1);
    const dataBaseDelete = `
    -- FUNCTION: public.fn_delete${ nombreFuncion}(${justType})

    -- DROP FUNCTION IF EXISTS public."fn_delete${ nombreFuncion}"(${justType});
    
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
    
    ALTER FUNCTION public."fn_delete${nombreFuncion}"(${justType})
        OWNER TO postgres;
    `;
    return {
        dataBaseDelete
    }
}
