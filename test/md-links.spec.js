// const  absolutePath  = require('../functions.js')
const { absolutePath } = require('../functions.js')
// const  mdLinks  = require('./index.js')

describe("absolutePath", () => {
  it("Es una función", () => {
    expect(typeof absolutePath).toEqual("function");
  })
})
  it("Al recibir una ruta absoluta la devuelve igual", () => {
    expect(absolutePath("C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/Prueba/esMd.md")).toEqual("C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/Prueba/esMd.md");
  })
  it("Al recibir una ruta relativa la devuelve absoluta", () => {
    expect(absolutePath("Archivos-md-txt/prueba.txt")).toEqual("C:\\Users\\LABORATORIA\\OneDrive\\Documentos\\MDlinks\\BOG005-md-links\\Archivos-md-txt\\prueba.txt");
  })
  



// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
