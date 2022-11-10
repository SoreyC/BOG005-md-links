const pathNode = require('path');
const fs = require('fs');
const marked = require('marked');
const axios = require('axios');
// const chalk = require('chalk');

const routeTest = 'Archivos-md-txt';

//resolver rutas relativas en absolutas
const absolutePath = (route) => {
  if (pathNode.isAbsolute(route)) {
    return route;
  } else {
    return pathNode.resolve(route);
  }
  // return absolutePath;
};

  // console.log(chalk.redBright('ya es absoluta', absolutePath(routeTest)));

  //Recursividad
  const getMdFiles = (allFileMD) => {
    const isFile = fs.statSync(allFileMD).isFile();
    const isDirectory = fs.statSync(allFileMD).isDirectory();
    const readextName = pathNode.extname(allFileMD);
    let arrayMarkDown = [];
    let pathContainer = absolutePath(allFileMD);
    // console.log(chalk.cyan(pathContainer));
    if (isFile && readextName === '.md') {
      arrayMarkDown.push(pathContainer)
      // console.log(chalk.magenta(arrayMarkDown));
    } else if (isFile && readextName !== '.md') {
      // console.log(chalk.red('Archivo no tiene extensión .md son', readextName))
    } else if (isDirectory === true) {
      fs.readdirSync(allFileMD).forEach(file => {
        let routePath = pathNode.join(allFileMD, file);
        // console.log(fs.readdirSync(allFileMD))
        // console.log(chalk.magenta(routePath));
        if (isDirectory) {
          arrayMarkDown = arrayMarkDown.concat(getMdFiles(routePath))
        } else {
          if (pathNode.extname(routePath) === '.md') {
            arrayMarkDown.push(routePath)
          }
        }
      })
    }
    return arrayMarkDown; // Array de archivos MD 
  }

const routeAbsolute = absolutePath(routeTest);
const containerArray = getMdFiles(routeAbsolute)

//TODO: JSDOC
/**
 * @param {string} path archivo.md
 * @returns data
 * esta funcion se va a usar para extraer los links
 */


const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    let linksArray = [];
    // console.log('que es file', file);
    fs.readFile(file, 'utf8', (error, data) => { 
      if (error) {
        resolve(error);
      }
      let renderer = new marked.Renderer()
      renderer.link = (href, title, text) => {
        const linkOfData = {
          'href': href,
          'text': text,
          'file': file,
        }
        if (linkOfData.href.includes('http')) {
          linksArray.push(linkOfData);
        }
      }
      // console.log('que hay en marked', marked);
      marked.marked(data, { renderer });
      resolve(linksArray);
    });
  })

}
// readFilePromise('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/Prueba/esMd.md')
//   .then((res) => {
//     console.log(res);
//   })

const getFileAllobjects = (linksMdArrays) => {
  const returnPromise = linksMdArrays.map(file => readFilePromise(file));
  return Promise.all(returnPromise).then(res => res.flat())
}; 

// console.log(getFileAllobjects('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/Prueba/esMd.md'));


const processLink = (link) => {
  return new Promise((resolve, reject) => {
    axios.get(link.href)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          link.status = response.status
          link.ok = '✅';
          resolve(link);
        }
      }).catch((error) => {
        link.status = (error.name, "Please,check the link");
        link.ok = '🚫';
        resolve(link);
      });
  })
}
const getvalidateLinks = (validateLinks) => {
  let returnValidateLinks = validateLinks.map(link => processLink(link));
  return Promise.all(returnValidateLinks).then(res => res);
}

const statsLinks = (links) => {
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size

  }
}

//console.log(statsLinks(containerArray));

const statsValidatelinks = (links) => {

  const failes = links.filter(link => link.ok == '🚫').length
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
    Broken: failes
  }
}

//   console.log(statsValidatelinks(containerArray));

module.exports = { absolutePath, getMdFiles, readFilePromise, processLink, getFileAllobjects, getvalidateLinks, statsLinks, statsValidatelinks };