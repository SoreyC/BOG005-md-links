const pathNode = require('path');
const fs = require('fs');
const { marked } = require('marked');
const path = require('path');
// const chalk = require('chalk');

let pathprueba = 'Archivos-md-txt/prueba.txt';

// const pathProcess = process.argv[2];
//  console.log('process', pathProcess);



//resolver rutas relativas en absolutas
// METODO QUE RESUELVE RUTA RELATIVA-ABSOLUTA path.isAbsolute = true si es absoluta. path.resolve la resuelve.
const absolutePath = (route) => {
    if (pathNode.isAbsolute(route)) {
        return route;
        // console.log('es relativa', route);
    } else {
        return pathNode.resolve(route);
        // console.log('se cambia a absoluta', route);
    }
};
//  console.log('ya es absoluta', absolutePath(path));

//TODO: JSDOC
/**
 * 
 * @param {string} path archivo.md
 * @returns data
 * esta funcion se va a usar para extraer los links
 */
const readFilePromise = (pathprueba) => {

    return new Promise((resolve, reject) => {
        fs.readFile(pathprueba, 'utf8', (error, data) => {

            if (error) {
                reject(error);
            }

            //aca se podria de una vez sacar los links

            resolve({
                path: pathprueba,
                data: data,
            });
            //console.log(data);
        });
    });
};
readFilePromise(pathprueba)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });


//Para extraer las extensiones y meterla en la funcion de la lectura de dir


// const verifyFilt = (path) => {

//     if(fs.existsSync(path)){
//         return fileExist;
//     } else{ 
//         console.log('no hay directorio');
//     }
//     // return verifyFile;
//     // console.log('que hay?', verifyFile);
// }


//Verificando si existe directorio
const getMdFiles = (path) => {
    let mdFiles = [];
    if (fs.statSync(path).isDirectory()) {
        fs.readdirSync(path).forEach(file => {
            const fileResolve = pathNode.resolve(`${path}/${file}`)
            if (fs.statSync(fileResolve).isDirectory()) {
                mdFiles = mdFiles.concat(getMdFiles(fileResolve))
            }else{
                if (pathNode.extname(file) === '.md')
                mdFiles.push(file)
            }         
        });
    } else {
        if (pathNode.extname(path) === '.md')
            mdFiles.push(path)
    }
    return mdFiles
};
console.log(getMdFiles('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt'));
// console.log(getMdFiles('Archivos-md-txt/readme.md'));


//mdLinks
const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path))
            //  verifyAbsolut = absolutePath(path);
            // resolve(verifyAbsolut)

            console.log('Ruta no válida');

    })
}

mdLinks('dele.js')
    .then(res => {
        console.log("si sirve", res);
    });



// module.exports = () => {
//   // ...
// };