const express = require("express")
const fs = require("fs") //fileSystem
const router = express.Router()

//función auxiliar
const removeExtension = (fileName) => {
    //Solo la primera parte del split (lo de antes del punto)
    return fileName.split('.').shift()
}

//__dirname me coge el directorio actual (en el que está el fichero 'file')
fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file) // index, users, storage, tracks
    if(name !== 'index') {
        //enlazará el nombre del fichero con la ruta 'routes/name': nos creará la url
        router.use('/' + name, require('./'+name)) // http://localhost:3000/api/tracks
    }
})

module.exports = router