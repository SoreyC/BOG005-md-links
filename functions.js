const pathNode = require('path');
const fs = require('fs');
const { marked } = require('marked');
// const chalk = require('chalk');

//let pathprueba = 'Archivos-md-txt/prueba.txt';

// const pathProcess = process.argv[2];
//  console.log('process', pathProcess);

// //Verificando si existe una ruta
//  const verifyPath = (pathProcess) =>{

//     if(fs.existsSync(pathProcess)){
//         return fileExist;
//     } else{ 
//         console.log('no hay archivo');
//     }
//     //return verifyPath;
//     console.log('que hay?', verifyPath);
// };



//Verificando si existe directorio
// const verifyDirectory = (path) => {
    
//     if(fs.readdirSync(path)){
//         return directoryExist;
//     } else{ 
//         console.log('no hay directorio');
//     }
//     // return verifyDirectory;
//     // console.log('que hay?', verifyDirectory);
// }


//resolver rutas relativas en absolutas
// METODO QUE RESUELVE RUTA RELATIVA-ABSOLUTA path.isAbsolute = true si es absoluta. path.resolve la resuelve.
const absolutePath = (route) => {
    // let absolutPath;
    if (pathNode.isAbsolute(route)) {
        return route;
        // console.log('es relativa', route);
    } else {
        return pathNode.resolve(route);
    // console.log('se cambia a absoluta', route);
    }
    //return absolutPath
};
// console.log('ya es absoluta', absolutePath(path));

//TODO: JSDOC
/**
 * 
 * @param {string} path archivo.md
 * @returns data
 * esta funcion se va a usar para extraer los links
 */
// const readFilePromise = (pathProcess) => {   
       
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, 'utf8', (error, data) => {

//             if (error) {
//                 reject(error);
//             }
        
//             //aca se podria de una vez sacar los links

//             resolve({
//                 path: pathProcess,
//                 data: data,
//             });
//             //console.log(data);
//         });
//     });

// };
// readFilePromise(pathProcess)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });


//Para extraer las extensiones y meterla en la funcion de la lectura de dir

const extName = (path) => {
    const ext = pathNode.extname(path);
    return ext;
};
console.log(extName('prueba.txt'));


//mdLinks
const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        try{
            const verifyAbsolut = absolutePath(path);

            resolve(verifyAbsolut)
         }catch(error){
            console.log('Ruta no válida');
         }
        
    })
}

mdLinks('dele.js')
.then(res => {
    console.log("si sirve", res);
});



// module.exports = () => {
//   // ...
// };