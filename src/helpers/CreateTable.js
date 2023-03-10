import React from 'react';

export const CreateTable = (data, nombre, data2) => {

    let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreTabla.map(resp => {
        return resp.toLowerCase();
    })
    nombreTabla = nombreTabla.join('_').toLowerCase();
    let insertTable = '';
    let insertTable2 = '';
    let createSqlInicio = ``;
    let createSqlFin = ``;
    for (const key in data2.inputForm) {
        if(data.inputForm[key].trim() !== 'id_'+nombreTabla){
            insertTable +=  data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '') +  ", ";
            if((data2.inputForm[key].trim() === 'varchar') || 
               (data2.inputForm[key].trim() === 'date') || 
               (data2.inputForm[key].trim() === 'text')||
               (data2.inputForm[key].trim() === 'character varying') ){
                insertTable2 += " '' ,";
            }else{
                insertTable2 += "   ,";
            }
        }

        if(data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '') === 'id_'+nombreTabla){
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} serial,\n`;
            createSqlFin = createSqlFin + `constraint pk_${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} primary key (${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')}),\n`;

        }else if(data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '').slice(0,3) === 'id_'){

            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} ${data2.inputForm[key].trim()} not null,\n`;
            createSqlFin += `constraint fk_${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} foreign key (${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')}) references ${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '').slice(3)}(${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')}),\n`;
        }else if((data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '') === `correo_${nombreTabla}`|| /* falta para numero de serie de producto  */
            data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '') === `correo`||
            data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '') === `email`||
            data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '') === `email_${nombreTabla}`)&&(
                nombreTabla === 'user' || 
                nombreTabla === 'usuario'||
                nombreTabla === 'employee'||
                nombreTabla === 'empleado'||
                nombreTabla === 'administrator'||
                nombreTabla === 'administrador'
                
                )){   /* y otros columnas unicas */
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} varchar(255) not null,\n`;
            createSqlFin = createSqlFin + `constraint unique_${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} unique(${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')}),\n`;

        }else if(data2.inputForm[key].trim() === `varchar`) {
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} varchar(255) not null,\n`;

        }else{
            createSqlInicio += `${data.inputForm[key].trim().replace(/[^a-zA-Z0-9_ ]/g, '')} ${data2.inputForm[key].trim()} not null,\n`;
        }
    }
    let createTable = 
`create table ${nombreTabla} (
${createSqlInicio}
${createSqlFin}
`; 
    insertTable = insertTable.trim().slice( 0, -1);
    insertTable2 = insertTable2.trim().slice( 0, -1);
    createTable = createTable.trim().slice(0,-1) + `\n);
INSERT INTO ${nombreTabla} (${insertTable}) 
VALUES (${insertTable2})
`;
    return {
        createTable
    }
}
