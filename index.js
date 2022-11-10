const { absolutePath, getMdFiles, readFilePromise, processLink, getFileAllobjects, getvalidateLinks, statsLinks, statsValidatelinks } = require('./functions.js');
const routeTest = 'Archivos-md-txt';

const mdLinks = (path, options = { validate: false }) => {
    return new Promise((resolve, reject) => {

        const verifyAbsolut = absolutePath(path);
        // console.log('path abs', verifyAbsolut)
        const containerArray = getMdFiles(verifyAbsolut);
        if (options.validate === true) {
            getFileAllobjects(containerArray)
                .then(res => getvalidateLinks(res))
                .then(res2 => resolve(res2));
        } else if (options.validate === false) {
            getFileAllobjects(containerArray)
                .then(res => resolve(res));
        } else {
            resolve(chalk.red("E    R     R    O     R.    please check again!!"));
        }
    });
}

// mdLinks(routeTest).then((data) => {
//     console.log(("ya no si sirve", data));
// });


module.exports = { mdLinks };