const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}
const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente a la tarea'
}
const argv = require('yargs')
    .command('crear', 'Lista una tarea por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Lista las tareas', { completado })
    .command('borrar', 'Borra una tarea', { descripcion })
    .boolean('c')
    .help()
    .argv;

module.exports = {
    argv
};