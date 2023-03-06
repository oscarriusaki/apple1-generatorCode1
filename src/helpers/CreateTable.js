import React from 'react'

export const CreateTable = (data, nombre, data2) => {

    let nombreTabla = nombre.split(' ')
    nombreTabla.map(resp => {
        return resp.toLowerCase();
    })
    nombreTabla = nombreTabla.join('_');
    
    const sql = `
    create table ${nombreTabla} (

        id_comentario serial,
        id_producto integer not null,
        id_usuario integer not null,
        descripcion text not null,
        fecharegistro date not null,
        fechamodificacion date not null,
        estadoeliminar boolean not null,
    
        constraint pk_id_comentario primary key (id_comentario),
        constraint fk_id_producto foreign key (id_producto) references producto(id_producto),
        constraint fk_id_usuario foreign key (id_usuario) references usuario(id_usuario)
        
    );
    `;

  return {
    sql
  }
}
