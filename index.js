const { absolutePath, getMdFiles, readFilePromise, processLink, getFileAllobjects, getvalidateLinks, statsLinks, statsValidatelinks } = require('./functions.js');
const routeTest = 'Archivos-md-txt';

const mdLinks = (path, options = { validate: false }) => {
    return new Promise((resolve, reject) => {
        
    const verifyAbsolut = absolutePath(path);
        const containerArray = getMdFiles(verifyAbsolut);
        if (option.validate) {
            getFileAllobjects(containerArray)
                .then(res => getvalidateLinks(res))
                .then(res2 => resolve(res2));
        } else {
            getFileAllobjects(containerArray)
                .then(res => resolve(res));
        }
    });
}

mdLinks (routeTest).then((data) => {
    console.log(("si sirve", data));
  });
  
  
  module.exports = {mdLinks};