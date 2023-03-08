import React from 'react';

export const CreateTable = (data, nombre, data2) => {

    let nombreTabla = nombre.trim().replace(/\s+/g, ' ').split(' ');
    nombreTabla.map(resp => {
        return resp.toLowerCase();
    })
    nombreTabla = nombreTabla.join('_').toLowerCase();
    let createSqlInicio = ``;
    let createSqlFin = ``;
    for (const key in data2.inputForm) {
        if(data.inputForm[key].trim() === 'id_'+nombreTabla){
            createSqlInicio += `${data.inputForm[key].trim()} serial,\n`;
            createSqlFin = createSqlFin + `constraint pk_${data.inputForm[key].trim()} primary key (${data.inputForm[key].trim()}),\n`;

        }else if(data.inputForm[key].trim().slice(0,3) === 'id_'){

            createSqlInicio += `${data.inputForm[key].trim()} ${data2.inputForm[key].trim()} not null,\n`;
            createSqlFin += `constraint fk_${data.inputForm[key].trim()} foreign key (${data.inputForm[key].trim()}) references ${data.inputForm[key].trim().slice(3)}(${data.inputForm[key].trim()}),\n`;
        }else if((data.inputForm[key].trim() === `correo_${nombreTabla}`|| /* falta para numero de serie de producto  */
            data.inputForm[key].trim() === `correo`||
            data.inputForm[key].trim() === `email`||
            data.inputForm[key].trim() === `email_${nombreTabla}`)&&(
                nombreTabla === 'user' || 
                nombreTabla === 'usuario'||
                nombreTabla === 'employee'||
                nombreTabla === 'empleado'||
                nombreTabla === 'administrator'||
                nombreTabla === 'administrador'
                
                )){   /* y otros columnas unicas */
            createSqlInicio += `${data.inputForm[key].trim()} varchar(255) not null,\n`;
            createSqlFin = createSqlFin + `constraint unique_${data.inputForm[key].trim()} unique(${data.inputForm[key].trim()}),\n`;

        }else if(data2.inputForm[key].trim() === `varchar`) {
            createSqlInicio += `${data.inputForm[key].trim()} varchar(255) not null,\n`;

        }else{
            createSqlInicio += `${data.inputForm[key].trim()} ${data2.inputForm[key].trim()} not null,\n`;
        }
    }
    let createTable = `
create table ${nombreTabla} (
${createSqlInicio}
${createSqlFin}
`;
    createTable = createTable.trim().slice(0,-1) + '\n);';
    return {
        createTable
    }
}
