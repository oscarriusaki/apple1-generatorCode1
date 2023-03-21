import React from 'react';

export const CreateTable = (data, nombre, data2) => {

    let nombreTabla = nombre.trim().replace(/[\s_]+/g, ' ').split(' ');
    nombreTabla.map(resp => {
        return resp.toLowerCase();
    })
    nombreTabla = nombreTabla.join('_').toLowerCase();
    let insertTable = '';
    let insertTable2 = '';
    let createSqlInicio = ``;
    let createSqlFin = ``;
    let comentarioAtributos = ``;

    for (const key in data2.inputForm) {

        if(data.inputForm[key].trim().toLowerCase() === 'id_'+nombreTabla){
            comentarioAtributos += `COMMENT ON COLUMN public.${nombreTabla}.${data.inputForm[key].trim().toLowerCase()} IS 'Es el identificador unico de la tabla ${nombreTabla}';\n`
        }else if((data.inputForm[key].trim().toLowerCase() === 'fechacre') || (data.inputForm[key].trim().toLowerCase() === 'fechacreacion')){
            comentarioAtributos += `COMMENT ON COLUMN public.${nombreTabla}.${data.inputForm[key].trim().toLowerCase()} IS 'Fecha de creacion del registro';\n`
        }else if((data.inputForm[key].trim().toLowerCase() === 'fechamod') || (data.inputForm[key].trim().toLowerCase() === 'fechamodificacion')){
            comentarioAtributos += `COMMENT ON COLUMN public.${nombreTabla}.${data.inputForm[key].trim().toLowerCase()} IS 'Fecha de modificacion del registro';\n`
        }else if(data.inputForm[key].trim().toLowerCase() === 'estadoeliminar'){
            comentarioAtributos += `COMMENT ON COLUMN public.${nombreTabla}.${data.inputForm[key].trim().toLowerCase()} IS 'Estado logico del registro';\n`
        }else{
            comentarioAtributos += `COMMENT ON COLUMN public.${nombreTabla}.${data.inputForm[key].trim().toLowerCase()} IS '';\n`
        }

        if(data.inputForm[key].trim() !== 'id_'+nombreTabla){
            insertTable +=  data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') +  ", ";
            if((data2.inputForm[key].trim() === 'varchar') || 
               (data2.inputForm[key].trim() === 'date') || 
               (data2.inputForm[key].trim() === 'text')||
               (data2.inputForm[key].trim() === 'timestamp')||
               (data2.inputForm[key].trim() === 'character varying') ){
                insertTable2 += " '',"; 
            }else{
                insertTable2 += "  ,"; 
            }
        }

        if(data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') === 'id_'+nombreTabla){
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} ${data2.inputForm[key].trim().toUpperCase()} NOT NULL,\n`;
            createSqlFin = createSqlFin + `constraint pk_${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} primary key (${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')}),\n`;

        }else if(data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').slice(0,3) === 'id_'){

            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} ${data2.inputForm[key].trim().toUpperCase()} NOT NULL,\n`;
            createSqlFin += `constraint fk_${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} foreign key (${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')}) references ${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '').slice(3)}(${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')}),\n`;
        }else if((data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') === `correo_${nombreTabla}`|| /* falta para numero de serie de producto  */
            data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') === `correo`||
            data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') === `email`||
            data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '') === `email_${nombreTabla}`)&&(
                nombreTabla === 'user' || 
                nombreTabla === 'usuario'||
                nombreTabla === 'employee'||
                nombreTabla === 'empleado'||
                nombreTabla === 'administrator'||
                nombreTabla === 'administrador'
                
                )){   /* y otros columnas unicas */
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} VARCHAR(255) NOT NULL,\n`;
            createSqlFin = createSqlFin + `constraint unique_${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} unique(${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')}),\n`;

        }else if(data2.inputForm[key].trim() === `varchar`) {
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} VARCHAR(255) NOT NULL,\n`;

        }else{
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ $#@~%[]/g, '')} ${data2.inputForm[key].trim().toUpperCase()} NOT NULL,\n`;
        }
    }
    let createTable = 
`----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                            FECHA: ${new Date()} 
-- MÓDULO: ${nombreTabla}                   PROYECTO: TIENDA              ACTIVIDAD: set-app-1
-- CREACIÓN DE LA TABLA: ${nombreTabla}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS DE APOYO:

-- SELECT * FROM ${nombreTabla} ORDER BY id_${nombreTabla} DESC;
----------------------------------------------------------------------------------------------------------------------------
-- SENTENCIAS EXTRAS:

-- INSERT INTO ${nombreTabla} (${insertTable}) 
-- VALUES (${insertTable2});
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- 
----------------------------------------------------------------------------------------------------------------------------

CREATE TABLE public.${nombreTabla} (
${createSqlInicio}
${createSqlFin}`; 

    insertTable = insertTable.trim().slice( 0, -1);
    insertTable2 = insertTable2.trim().slice( 0, -1);
    createTable = createTable.trim().slice(0,-1) + `\n);

-- Agregamos permisos de ${nombreTabla}
ALTER TABLE public.${nombreTabla} OWNER to postgres;
-- Creamos la secuencia
CREATE SEQUENCE public.${nombreTabla}_secuencia
    AS INTEGER 
    START WITH 1 
    INCREMENT BY 1 
    NO MINVALUE 
    NO MAXVALUE 
    CACHE 1;
-- Agregamos permisos de usuario a la secuencia creada  
ALTER TABLE public.${nombreTabla}_secuencia OWNER to postgres;
-- Asignamos la secuencia
ALTER SEQUENCE public.${nombreTabla}_secuencia OWNED BY public.${nombreTabla}.id_${nombreTabla};
-- cuando se inserte un nuevo registro en la tabla y no se especifique un valor para esta columna, se generará automáticamente un valor único para esta columna utilizando la secuencia especificada.
ALTER TABLE ONLY public.${nombreTabla} ALTER COLUMN id_${nombreTabla} SET DEFAULT nextval('public.${nombreTabla}_secuencia'::regclass);

--Comentamos la tabla public.${nombreTabla}
COMMENT ON TABLE public.${nombreTabla} IS 'Tabla que registra informacion de ${nombreTabla}';
--Comentamos los atributos de la tabla public.${nombreTabla}
${comentarioAtributos}

INSERT INTO ${nombreTabla} (${insertTable}) 
VALUES (${insertTable2});

SELECT * FROM ${nombreTabla} ORDER BY id_${nombreTabla} DESC;
`;
    return {
        createTable
    }
} 