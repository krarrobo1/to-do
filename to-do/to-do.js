const fs = require('fs');


let listadoPorHacer = [];



const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./bd/data.json', data, (err) => {
        if (err) throw new Error(err);
    });
};

const getListado = (estado) => {
    cargarDB();
    console.log(estado);
    return listadoPorHacer.filter(tarea => tarea.completado === estado);
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
};
/*const cargarDB = () => {
    return new Promise((res, rej) => {
        fs.readFile('./bd/data.json', 'utf8', (err, data) => {
            if (err) rej(err);
            else res(JSON.parse(data));
        });
    });
};*/
let cargarDB = () => {
    try {
        listadoPorHacer = require('../bd/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
}
const crear = (descripcion) => {
    //cargarDB().then(res => console.log(res));
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (nuevoListado.length == listadoPorHacer.length) return false;
    else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
};


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}