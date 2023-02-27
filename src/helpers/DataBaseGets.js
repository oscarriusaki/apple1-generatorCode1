import React from 'react'

export const DataBaseGets = (data, nombre, data2) => {
  
    let dataAux = '';
    let count = 1;
    for(const n in data2.inputForm){
      dataAux += data[`columna${count}`]+'';
      count ++;
    }

    let palabra = nombre.split(' ');
    palabra = palabra.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase();
    })
    palabra = palabra.join('');

    let nombreTabla = nombre.split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.toLowerCase();
    });
    nombreTabla = nombreTabla.join('_');

    const dataBaseGets = `
    -- FUNCTION: public.fn_get${palabra}s()

    -- DROP FUNCTION IF EXISTS public."fn_get${palabra}s"();

    CREATE OR REPLACE FUNCTION public."fn_get${palabra}s"(
        )
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
        WHERE estadoeliminar = true
        ORDER BY id_${nombreTabla} DESC;
    END;
    $BODY$;

    ALTER FUNCTION public."fn_get${palabra}s"()
        OWNER TO postgres;
    `;
  return {
    dataBaseGets
  }
}
