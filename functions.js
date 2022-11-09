const pathNode = require('path');
const fs = require('fs');
const marked = require('marked');
const axios = require('axios');

const routeTest = 'Archivos-md-txt';

//resolver rutas relativas en absolutas
const absolutePath = (route) => {
  if (pathNode.isAbsolute(route)) {
    return route;
  } else {
    return pathNode.resolve(route);
  }
};
return absolutePath;
// console.log('ya es absoluta', absolutePath(routeTest));

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

const containerArray = getMdFiles(routeTest)

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
      console.log('que hay en data', data);
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
      // console.log('que hay en marked', marked);
      marked.marked(data, { renderer })
      resolve(linksArray);
    });
  });
};
readFilePromise(routeTest)
    .then((res) => {
        console.log(res);
    })

const getFileAllobjects = (arrayOfLinks) => {
  const returnPromise = arrayOfLinks.map(file => readFilePromise(file));
  return Promise.all(returnPromise).then(res => res.flat())
};

getFileAllobjects(prueba).then((res) => { console.log(res)})

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
  // console.log({
  //     Total: links.length,
  //     Unique: new Set(links.map((link) => link.href)).size
  // })
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size

  }
}

  console.log(statsLinks(containerArray));


const statsValidatelinks = (links) => {

  const failes = links.filter(link => link.ok == '🚫').length

  // console.log( {
  //     Total: links.length,
  //     Unique: new Set(links.map((link) => link.href)).size,
  //     Broken: failes
  // })
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
    Broken: failes
  }
}

//   console.log(statsValidatelinks(containerArray));










// mdLinks
// const mdLinks = (path, options) => {
//     return new Promise((resolve, reject) => {
//         if (fs.existsSync(path))

//             verifyAbsolut = absolutePath(path);
//             arrayContent = getMdFiles (verifyAbsolut)
//             resolve(arrayContent)



//     })
//  }

// mdLinks('readme.md')
//     .then((res) => {
//         console.log("si sirve", res);
//     });



module.exports = { absolutePath, getMdFiles, readFilePromise, processLink, getFileAllobjects, getvalidateLinks, statsLinks, statsValidatelinks };