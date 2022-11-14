const { absolutePath, getMdFiles, readFilePromise, processLink, getFileAllobjects, getvalidateLinks, statsLinks, statsValidatelinks } = require('./functions.js');
const { existsSync } = require('node:fs');
const chalk = require('chalk');
const routeTest = 'Archivos-md-txt';

const mdLinks = (path, options = { validate: false }) => {
    return new Promise((resolve, reject) => {
        if (!existsSync(path)){
        reject(chalk.red("E    R     R    O     R.    please check again!!"));
        }
        const verifyAbsolut = absolutePath(path);
        //  console.log('path abs', verifyAbsolut)
        const containerArray = getMdFiles(verifyAbsolut);
        if (options.validate === true) {
            getFileAllobjects(containerArray)
                .then(res => getvalidateLinks(res))
                .then(res => resolve(res));
        } else if (options.validate === false) {
            getFileAllobjects(containerArray)
                .then(res => resolve(res));
        }
    });
}

// mdLinks('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/readmeLinkRotos.md').then((data) => {
//     console.log(("ya no si sirve", data));
// });


module.exports = { mdLinks };

//PRUEBAS
//ruta vacia 'C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/rutaVacia.txt'
//rutas rotas 'C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/readmeLinkRotos.md'