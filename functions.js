const pathNode = require('path');
const fs = require('fs');
const { marked } = require('marked');
// const chalk = require('chalk');

//let pathprueba = 'Archivos-md-txt/prueba.txt';

const pathProcess = process.argv[2];
console.log('process', pathProcess);

//resolver rutas relativas en absolutas
// METODO QUE RESUELVE RUTA RELATIVA-ABSOLUTA path.isAbsolute = true si es absoluta. path.resolve la resuelve.
const absolutePath = (route) => {
    let absolutPath;
    if (pathNode.isAbsolute(route)) {
        absolutPath = route;
        console.log('es relativa', route);
    } else {
        absolutPath = pathNode.resolve(route).normalize();
        console.log('se cambia a absoluta', route);
    }
    return absolutPath
};
//console.log('ya es absoluta', absolutePath(pathProcess));

//TODO: JSDOC
/**
 * 
 * @param {string} path archivo.md
 * @returns data
 * esta funcion se va a usar para extraer los links
 */
const readFilePromise = (path) => {   
       
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {

            if (error) {
                reject(error);
            }
        
            //aca se podria de una vez sacar los links

            resolve({
                path: pathProcess,
                data: data,
            });
            //console.log(data);
        });
    });

};
readFilePromise(pathProcess)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });


//Para extraer las extensiones y meterla en la funcion de la lectura de dir

const extName = (path) => {
    const ext = pathNode.extname(absolutePath(path)) === '.md';
    return ext;
};
//console.log(extName(path));


//mdLinks
const mdLinks = (pathProcess, options) => {
    return new Promise((resolve, reject) => {
        const verifyAbsolut = absolutePath(pathProcess);

        resolve(verifyAbsolut)
    })
}

// mdLinks(pathProcess)
// .then(res => {
//     console.log("si sirve", res);
// });



// module.exports = () => {
//   // ...
// };