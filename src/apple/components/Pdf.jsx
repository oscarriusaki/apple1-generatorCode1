import React from 'react';
import { Document, Image, Page, Text, View, PDFDownloadLink, StyleSheet} from '@react-pdf/renderer';
// import { Table, TableRow, TableCell } from '@react-pdf/table';

export const Pdf = () => {
  
const styles = StyleSheet.create({
    table: {  // <- esta tabla solo tiene borde a la izquierda y arriba 
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
     /*  marginBottom: '-1', // <- sirve para alinear abajo cuando es -1 es hacia el lado contrario
      marginTop: '-1',
      marginRight: '-1',
      marginLeft: '-1', */
      borderWidth: 1,
      borderRightWidth: 0,  // <- quita borde de la derecha
      borderBottomWidth: 0,  // <- quita borde de la abajo
    },
    table2: {  // <- esta tabla solo tiene borde arriba
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,  // <- quita margen de la derecha
      borderBottomWidth: 0,  // <- quita margen de abajo
      borderLeftWidth: 0,  // <- quita margen de la izquierda
    },
    table3: {  // <- tabla sin bordes
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,  // <- quita margen de la derecha
      borderBottomWidth: 0,  // <- quita margen de abajo
      borderLeftWidth: 0,  // <- quita margen de la izquierda
      borderTopWidth: 0,  // <- quita margen de arriva
    },
    tableRow: { // <- esta fila solo es una fila no pone borde
        margin: 'auto',
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    tableRow3: { // <- fila solo con borde derecha y abajo
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    tableRow31: { // <- fila solo con borde abajo
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    tableRow32: { // <- fila tamano 100% sin bordes
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow33: { // <- fila tamano 100% sin bordes
        width: '100%',
        height: '65px',
        flexDirection: 'row',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableCol: {// <- column con ancho 50% sin borde 
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    tableCol7: { // <- columna con ancho al 50% y solo con borde en la derecha
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    tableCol71: { // <- columna con ancho al 50% y sin borde
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    tableCol5: { // <- esta columna es para hacer de 3 y tiene un ancho de 36%
        width: '36%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0, 
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    tableCol52: { // <- esta columna es para hacer de 3 y tiene un ancho de 36%
        width: '36%',
        borderStyle: 'dotted',   // <- bordes de puntos
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0, 
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '60px'
    },
    tableCol51: { // <- esta columna es para hacer de 3 y tiene un ancho de 36% y no pone border a nungun lado solo es una columna sin borde
        width: '36%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    tableCell: {
        margin: 'auto',
        fontSize: 12,
    },
  });
  
    return (
        <Document>
            {/* <Page size={'A4'} style={{padding: 70.875}}> */} {/* <-- carta */}
            {/* <Page style={'216mm x 279mm'}> */} {/* <-- carta */}
            {/* <Page style={'216mm x 330mm'}> */} {/* <-- officio */}
            <Page size={'A4'} style={{width: '21.6cm', height: '27.9cm', paddingTop: '2.5cm', paddingBottom: '2.5cm', paddingLeft: '2.5cm', paddingRight: '2.5cm'}}>
                <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',  
                    }}>
                    <Text style={{marginTop: '-2.5cm'}}>Por Oscar</Text>
                    <Image src="Picsart_23-03-19_00-47-52-416.jpg" style={{marginTop: '-2.5cm'}} />
                    <Text style={{textAlign: 'center'}}>
                        holaaa  
                    </Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol7}>
                                <Text style={styles.tableCell}>
                                    111
                                </Text>
                                <Text style={styles.tableCell}>
                                    111
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Image src="img5.png"/>
                                <Text style={styles.tableCell}> hola</Text>
                                <View style={styles.table2}>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Buenos dias</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Buenos dias</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla11</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla11</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow33}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tablaoo</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol7}>
                                <Text style={styles.tableCell}>
                                    111
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Image src="img5.png"/>
                                <Text style={styles.tableCell}> hola</Text>
                                <View style={styles.table2}>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow32}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol7}>
                                <Text style={styles.tableCell}>
                                    111
                                </Text>
                            </View>
                            <View style={styles.tableCol}>
                                <View style={styles.table3}>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.table3}>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow31}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow32}>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla55</Text>
                                        </View>
                                        <View style={styles.tableCol7}>
                                            <Text style={styles.tableCell}>Otra tabla5</Text>
                                        </View>
                                        <View style={styles.tableCol71}>
                                            <Text style={styles.tableCell}>Otra tabla5</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.table3}>
                                <View style={styles.tableRow33}>
                                    <View style={styles.tableCol52}>
                                        <Text style={styles.tableCell}>
                                            Te1
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol52}>
                                        <Text style={styles.tableCell}>
                                            Te2
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol51}>
                                        <Text style={styles.tableCell}>
                                            Te3
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
            {/* PARA ADICIONAR OTRA PAGINA AL PDF SOLO DEBES PONER LA ETIQUETA <Page></Page> Y TODO LO DEMAS COMO ESTA ARRIBA */}
            {/* <Page  style={{width: '21.6cm', height: '27.9cm', paddingTop: '2.5cm', paddingBottom: '2.5cm', paddingLeft: '2.5cm', paddingRight: '2.5cm'}}>
                <Text>
                Como estas  
            </Text>
            <Line />
            </Page> */}
            {/* <Page>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Encabezado1</TableCell>
                            <TableCell>Encabezado1</TableCell>
                            <TableCell>Encabezado1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Page> */}
        </Document>    
    )
}