const pathNode = require('path');
const fs = require('fs');
const marked = require('marked');
// const { marked } = require('marked');
const axios = require('axios');
const chalk = require('chalk');

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


//Verificando si existe directorio. recursividad
const getMdFiles = (path) => {
  let mdFiles = [];
  if (fs.statSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(file => {
      const fileResolve = pathNode.resolve(`${path}/${file}`)
      if (fs.statSync(fileResolve).isDirectory()) {
        mdFiles = mdFiles.concat(getMdFiles(fileResolve))
      } else {
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
//console.log('Recursividad', getMdFiles('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt'));
  // console.log(getMdFiles('Archivos-md-txt/readme.md'));

const routeAbsolute = absolutePath(routeTest);
const containerArray = getMdFiles(routeAbsolute)

// const readFilePromise  = (file) => {
//   let regExpo = new RegExp(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/); // para obtener solo url
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, 'utf8', (error, info) => {
//       if (!error) {
//         let linksArray  = [];
//         let render = new marked.Renderer();
//         render.link = function (href, title, text) {
//           if (regExpo.test(href) === true) {
//             linksArray .push({
//               href: href,
//               text: text.slice(0, 50),
//               file: file,
//             })
//           }
//         };
//         marked(info, {
//           renderer: render
//         });
//         resolve(linksArray )
//       }
//       else {
//         reject(error)
//       }
//     }
//     );
//   }) 
// }
// readFilePromise(routeAbsolute).then((res)=>console.log(res))
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
      const renderer = new marked.Renderer()
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
      //console.log('que hay en marked', marked);
      marked.marked(data, { renderer });
      resolve(linksArray);
    });
  
  });
};
// readFilePromise('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/Prueba/esMd.md')
//   .then((res) => {
//     console.log(res);
//   })

const getFileAllobjects = (linksMdArrays) => {
  const returnPromise = linksMdArrays.map(file => readFilePromise(file));
  return Promise.all(returnPromise).then(res => res.flat())
};

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