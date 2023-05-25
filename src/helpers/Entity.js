import React from 'react';

export const Entity = (data, nombre, data2) => {
    let nombreTabla =  nombre.trim().split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase()
    })
    nombreTabla = nombreTabla.join('')
    let nombreTabla2 = nombre.trim().split(' ');
    nombreTabla2 = nombreTabla2.map(resp => {
        return resp.toLowerCase()
    })
    nombreTabla2 = nombreTabla2.join('_');
    let importType = '';
    let columnType = '';
    let verifyType = [];
    let columns = '';

    for (const key in data.inputForm) {
        
        if('id_'+nombreTabla  === data.inputForm[key]+''.trim()){
                 
            if( !verifyType.includes('@PrimaryGeneratedColumn()') ){
                verifyType.push('@PrimaryGeneratedColumn()')
                importType =+ `PrimaryGeneratedColumn, ` 
            }
            columnType =+ `@PrimaryGeneratedColumn('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: numeric;\n\n`;
            columns =+ `${data.inputForm[key].trim()}, `;

        }else{
            if( !verifyType.includes('@Column()') ){
                    verifyType.push('@Column()')
                    importType =+ `Column, ` 
            }
            
            if(data.inputForm[key] === 'email' || 
                data.inputForm[key] === 'correo'){

                columnType =+ `@Column('${data2.inputForm[key]}',{\nunique: true,\n})\n${data.inputForm[key].trim()}: string;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'text')||
                (data2.inputForm[key] === 'varchar') ||
                (data2.inputForm[key] === 'character varying')){      
                
                columnType =+ `@Column('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: string;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;
// ojo poner unique al email
            }else if( (data2.inputForm[key]=== 'date') ) {
 
                columnType =+ `@Column('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: Date;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key]=== 'timestamp') ) {
                // OJO aqui verificar si todo registra bien el con el tipo de dato tiemstamp 
                 
                columnType =+ `@Column('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: Date;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'integer') ) {
                 
                columnType =+ `@Column('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: number;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'boolean') ) {
                 
                columnType =+ `@Column('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: boolean;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'number') || (data2.inputForm[key] === 'float') ) {
                // se puede poner IsPositive()  y Min(0)  pero si quieres poner ambos el min no debe ser 0 debe ser mayor a cero
                // ya que el IsPositive() valida valores mayores a cero
                
                columnType =+ `@Column('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: number;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'integer') ) {
             
                columnType =+ `@Column('${data2.inputForm[key]}')\n${data.inputForm[key].trim()}: number;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else{
                // si es otro tiop de dato no se pondra o ver la documentacion para ponerlo
                importType =+ `Column, ` 
                columnType =+ `@Column()\n${data.inputForm[key]+''.trim()}: string;\n\n`;
                verifyType.push('@Column()')
                columns =+ `${data.inputForm[key]+''.trim()}, `;
            }
        }

    }
    
    importType = importType+''.trim().slice(0,-1);
    columns = columns+''.trim().slice(0,-1);

    const entityCode = 
`----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                            FECHA: ${new Date()} 
-- MÓDULO: ${nombreTabla}                   PROYECTO: TIENDA              ACTIVIDAD: set-app-1
-- CREACIÓN DE ENTYTI: ${nombreTabla}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- Se creo la el Dto de ${nombreTabla} con los campos:
/*
${columns}
*/
----------------------------------------------------------------------------------------------------------------------------

import { Entity, ${importType} } from "typeorm";

@Entity('${nombreTabla2}')
export class ${nombreTabla} {
        
    ${columnType}

}`;
  return {
    entityCode
  }
}
