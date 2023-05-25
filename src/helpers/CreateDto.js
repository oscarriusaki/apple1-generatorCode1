import React from 'react';

export const CreateDto = (data, nombre, data2) => {

    let nombreTabla =  nombre.trim().split(' ');
    nombreTabla = nombreTabla.map(resp => {
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase()
    })
    nombreTabla = nombreTabla.join('')

    let importType = '';
    let columnType = '';
    let verifyType = [];
    let columns = '';

    for (const key in data.inputForm) {
        console.log('11');
        if('id_'+nombreTabla !== data.inputForm[key]+''.trim()){
            
            if(data.inputForm[key] === 'email' || 
            data.inputForm[key] === 'correo'){
                    console.log('222');

                if( !verifyType.includes('@IsString()') ){
                    verifyType.push('@IsString()')
                    importType =+ `IsString, ` 
                }
                if( !verifyType.includes('@IsEmail()') ){
                    verifyType.push('@IsEmail()')
                    importType =+ `IsEmail, ` 
                }
                columnType = columnType + `@IsString()\n@IsEmail()\n${data.inputForm[key].trim()}: string;\n\n`;
                columns = columns + `${data.inputForm[key].trim()}, `;
                console.log(columnType,'columnType==========');
                console.log(columns,'columns==========');
            }else if(data.inputForm[key] === 'pas' || 
                data.inputForm[key] === 'password' || 
                data.inputForm[key] === 'contrasena'){

                if( !verifyType.includes('@IsString()') ){
                    verifyType.push('@IsString()')
                    importType =+ `IsString, `
                }
                if( !verifyType.includes('@MinLength()') ){
                    verifyType.push('@MinLength()')
                    importType =+ `MinLength, `
                }
                if( !verifyType.includes('@MaxLength()') ){
                    verifyType.push('@MaxLength()')
                    importType =+ `MaxLength, `
                }
                if( !verifyType.includes('@Matches()') ){
                    verifyType.push('@Matches()')
                    importType =+ `Matches, `
                }
                
                // if( !verifyType.includes('@IsString()') ){
                //     verifyType.push('@IsString()')
                //     importType =+ `IsString, MinLength, MaxLength, Matches` 
                // }

                columnType =+ `@IsString()\n@IsOptional()\n@MinLength(6)\n@MaxLength(50)\n@Matches(
                    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
                    message: 'The password must have a Uppercase, lowercase letter and a number'
                })\n${data.inputForm[key].trim()}: string;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if((data2.inputForm[key] === 'varchar') || 
                (data2.inputForm[key] === 'text')||
                (data2.inputForm[key] === 'character varying') ){
                    
                if( !verifyType.includes('@IsString()') ){
                    verifyType.push('@IsString()')
                    importType =+ `IsString, ` 
                }
                if( !verifyType.includes('@IsOptional()') ){
                    verifyType.push('@IsOptional()')
                    importType =+ `IsOptional, ` 
                }
                columnType =+ `@IsString()\n@IsOptional()\n${data.inputForm[key].trim()}: string;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key]=== 'date') || (data2.inputForm[key]=== 'timestamp') ) {

                if( !verifyType.includes('@IsDate()') ){
                    verifyType.push('@IsDate()')
                    importType =+ `IsDate, ` 
                }
                if( !verifyType.includes('@IsOptional()') ){
                    verifyType.push('@IsOptional()')
                    importType =+ `IsOptional, ` 
                }
                columnType =+ `@IsDate()\n@IsOptional()\n${data.inputForm[key].trim()}: Date;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'integer') ) {
                
                if( !verifyType.includes('@IsInt()') ){
                    verifyType.push('@IsInt()')
                    importType =+ `IsInt, ` 
                }
                if( !verifyType.includes('@IsOptional()') ){
                    verifyType.push('@IsOptional()')
                    importType =+ `IsOptional, ` 
                }
                columnType =+ `@IsInt()\n@IsOptional()\n${data.inputForm[key].trim()}: number;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'boolean') ) {
                
                if( !verifyType.includes('@IsBoolean()') ){
                    verifyType.push('@IsBoolean()')
                    importType =+ `IsBoolean, ` 
                }
                if( !verifyType.includes('@IsOptional()') ){
                    verifyType.push('@IsOptional()')
                    importType =+ `IsOptional, ` 
                }
                columnType =+ `@IsBoolean()\n@IsOptional()\n${data.inputForm[key].trim()}: boolean;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'number') || (data2.inputForm[key] === 'float') ) {
                // se puede poner IsPositive()  y Min(0)  pero si quieres poner ambos el min no debe ser 0 debe ser mayor a cero
                // ya que el IsPositive() valida valores mayores a cero
                if( !verifyType.includes('@IsNumber()') ){
                    verifyType.push('@IsNumber()')
                    importType =+ `IsNumber, ` 
                }
                if( !verifyType.includes('@IsOptional()') ){
                    verifyType.push('@IsOptional()')
                    importType =+ `IsOptional, ` 
                }
                columnType =+ `@IsNumber()\n@IsOptional()\n${data.inputForm[key].trim()}: number;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;

            }else if( (data2.inputForm[key] === 'integer') ) {
                
                if( !verifyType.includes('@IsInt()') ){
                    verifyType.push('@IsInt()')
                    importType =+ `IsInt, IsPositive, ` 
                }
                if( !verifyType.includes('@IsPositive()') ){
                    verifyType.push('@IsPositive()')
                    importType =+ `IsPositive, ` 
                }
                if( !verifyType.includes('@IsOptional()') ){
                    verifyType.push('@IsOptional()')
                    importType =+ `IsOptional, ` 
                }
                columnType =+ `@IsInt()\n@IsPositive()\n@IsOptional()\n${data.inputForm[key].trim()}: number;\n\n`;
                columns =+ `${data.inputForm[key].trim()}, `;
            }
            // else{
            //     // si es otro tiop de dato no se pondra o ver la documentacion para ponerlo
            //     importType =+ `IsOptional, ` 
            //     columnType =+ `@IsOptional()\n${data.inputForm[key]+''.trim()}: string;\n\n`;
            //     verifyType.push('@IsString()')
            //     columns =+ `${data.inputForm[key]+''.trim()}, `;
            // }
        }
        console.log(importType,'importTypeimportType');
        console.log(columns,'columnscolumns');
    }
     
    importType = importType+''.trim().slice(0,-1);
    columns = columns+''.trim().slice(0,-1);
    const createDto = 
`----------------------------------------------------------------------------------------------------------------------------
-- CREADO: Oscar Laura Aguirre                                            FECHA: ${new Date()} 
-- MÓDULO: ${nombreTabla}                   PROYECTO: TIENDA              ACTIVIDAD: set-app-1
-- CREACIÓN DE DTO: ${nombreTabla}                                                  
----------------------------------------------------------------------------------------------------------------------------
-- DESCRIPCION:

-- Se creo la el Dto de ${nombreTabla} con los campos:
/*
${columns}
*/
----------------------------------------------------------------------------------------------------------------------------

import { ${importType} } from "class-validator";

export class Create${nombreTabla}Dto {

    ${columnType}

}`;
  return {
    createDto
  }
}
