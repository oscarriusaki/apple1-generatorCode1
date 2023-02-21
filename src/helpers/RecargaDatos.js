import React, { useEffect, useState } from 'react'
import { DataBaseDelete } from './DataBaseDelete';
import { DataBaseGet } from './DataBaseGet';
import { DataBaseGets } from './DataBaseGets';
import { DataBasePost } from './DataBasePost';
import { DataBasePut } from './DataBasePut';
import { NodejsControllers } from './NodejsControllers';
import { NodejsRouter } from './NodejsRouter';

export const RecargaDatos = ( initial) => {

    const [returnData, setReturnData] = useState(initial);

    const f = (columna1, columna2) => {
        const { nodejsControllers } = NodejsControllers(columna1.trim(), columna2.trim());
        const { nodejsRouter } = NodejsRouter(columna1.trim(), columna2.trim());
        const { dataBaseDelete } = DataBaseDelete(columna1.trim(), columna2.trim());
        const { dataBaseGet } = DataBaseGet(columna1.trim(), columna2.trim());
        const { dataBaseGets } = DataBaseGets(columna1.trim(), columna2.trim());
        const { dataBasePost } = DataBasePost(columna1.trim(), columna2.trim());
        const { dataBasePut } = DataBasePut(columna1.trim(), columna2.trim());

        setReturnData({
            ...returnData,
            nodejsControllers: nodejsControllers,
            nodejsRouter: nodejsRouter,
            dataBaseDelete: dataBaseDelete,
            dataBaseGet: dataBaseGet,
            dataBaseGets: dataBaseGets,
            dataBasePost: dataBasePost,
            dataBasePut: dataBasePut
        })
    }

   /*  useEffect(() => {
        f(columna1, columna2)
    }, [])
 */
    return {
        ...returnData,
        returnData,
        f,
    }
}
