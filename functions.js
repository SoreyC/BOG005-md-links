const pathNode = require('path');
const fs = require('fs');
const { marked } = require('marked');
const axios = require('axios');
// const chalk = require('chalk');

// let pathprueba = 'Archivos-md-txt/prueba.txt';
let archivo = 'Archivos-md-txt\readme.md'

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
const readFilePromise = (file) => {
    return new Promise((resolve, reject) => {
        let linksArray = [];
        fs.readFile(file, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            }
            //aca se podria de una vez sacar los links
             const render = new marked.Renderer()
            render.link = (href, title, text) => {
                const linkOfData = {
                  'href': href,
                  'text': text.split('').slice(0, 60).join(''),
                  'file': file, 
                }
                if (linkOfData.href.includes('http')) {
                    linksArray.push(linkOfData)
                  }
                }
                marked.marked(data, { render })
                console.log('que hay aqui', marked);
                resolve(linksArray)

        });
    });
  
};
readFilePromise(archivo)
    .then((res) => {
        console.log(res);
    })
    // .catch((err) => {
    //     console.log(err);
    // });

    const getFileAllobjects = (arrayOfLinks) => {
        const returnPromise= arrayOfLinks.map(file => readFilePromise(file));
        return Promise.all(returnPromise).then(res => res)};
    
    
        




// const verifyFilt = (path) => {

//     if(fs.existsSync(path)){
//         return fileExist;
//     } else{ 
//         console.log('no hay directorio');
//     }
//     // return verifyFile;
//     // console.log('que hay?', verifyFile);
// }


//Verificando si existe directorio. recursividad
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
// const mdLinks = (path, options) => {
//     return new Promise((resolve, reject) => {
//         if (fs.existsSync(path))

//             verifyAbsolut = absolutePath(path);
//             arrayContent = getMdFiles (verifyAbsolut)
//             resolve(arrayContent)
        


//     })

   
// }
  
// mdLinks('readme.md')
//     .then((res) => {
//         console.log("si sirve", res);
//     });



// module.exports = () => {
//   // ...
// };