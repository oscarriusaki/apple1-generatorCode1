import React from 'react';

export const DataBaseGets = (data, nombre, data2) => {
  
  let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_');

    let dataAux = '';
    let count = 1;
    let columnConTypeDate = '';

    for(const n in data2.inputForm){
      if((nombreTabla.trim().toLowerCase() === 'user' || nombreTabla.trim().toLowerCase() === 'usuario'||
          nombreTabla.trim().toLowerCase() === 'employee' || nombreTabla.trim().toLowerCase() === 'empleado'||
          nombreTabla.trim().toLowerCase() === 'administrator' || nombreTabla.trim().toLowerCase() === 'administrador')&&
         ((data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo_'+nombreTabla)||
         (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'correo') ||
         (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email_'+nombreTabla) ||
         (data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').toLowerCase() === 'email'))){

        columnConTypeDate += 'o'+ data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') + ' '+ data2[n].trim() +', t_tokens text, ';
      }else{
        columnConTypeDate += 'o'+ data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') + ' '+ data2[n].trim() +', ';
      }
      dataAux += data[n].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '');
      count ++;
    }

    let palabra = nombre.trim().replace(/[\s_]+/g, ' ').split(' ');
    palabra = palabra.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    palabra = palabra.join('');
    columnConTypeDate = columnConTypeDate.trim().slice(0,-1);

    const dataBaseGets = 
`----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                            FECHA: ${new Date()} 
-- MÓDULO: ${nombreTabla}                   Proyecto: TIENDA                ACTIVIDAD: set-app-1
-- CREACIÓN DE LA FUNCION: fn_get${palabra}s                                                  
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:                                                              

-- SELECT * FROM public."fn_get${palabra}s"();
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- Se crea la funcion fn_get${palabra}s Para obtener todos los datos de la tabla ${nombreTabla}
----------------------------------------------------------------------------------------------------------------------------

-- FUNCTION: public.fn_get${palabra}s()

-- DROP FUNCTION IF EXISTS public."fn_get${palabra}s"();

CREATE OR REPLACE FUNCTION public."fn_get${palabra}s"(
    )
    RETURNS TABLE (${columnConTypeDate})
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT *
    FROM ${nombreTabla}
    WHERE estadoeliminar = 'TRUE'
    ORDER BY id_${nombreTabla} DESC;
END;
$BODY$;

ALTER FUNCTION public."fn_get${palabra}s"()
    OWNER TO postgres;`;
  return {
    dataBaseGets
  }
}
