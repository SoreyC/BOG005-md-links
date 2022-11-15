const { absolutePath, getvalidateLinks } = require('../functions.js')
const  { mdLinks }  = require('../index')
const  axios  = require('axios');
jest.mock('axios');

describe('absolutePath', () => {
  it('Es una función', () => {
    expect(typeof absolutePath).toEqual('function');
  })
})
  it('Al recibir una ruta absoluta la devuelve igual', () => {
    expect(absolutePath('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/Prueba/esMd.md')).toEqual('C:/Users/LABORATORIA/OneDrive/Documentos/MDlinks/BOG005-md-links/Archivos-md-txt/Prueba/esMd.md');
  })
  it('Al recibir una ruta relativa la devuelve absoluta', () => {
    expect(absolutePath('Archivos-md-txt/prueba.txt')).toEqual('C:\\Users\\LABORATORIA\\OneDrive\\Documentos\\MDlinks\\BOG005-md-links\\Archivos-md-txt\\prueba.txt');
  })

  const arrayFalse=
  [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\LABORATORIA\\OneDrive\\Documentos\\MDlinks\\BOG005-md-links\\Archivos-md-txt\\Prueba\\readmePrueba.md',
    },
  ]
  
  const arrayTrue=[
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\LABORATORIA\\OneDrive\\Documentos\\MDlinks\\BOG005-md-links\\Archivos-md-txt\\Prueba\\readmePrueba.md',
      status: 200,
      ok: '✅'
    }, 
  ]
  
  describe('mdLinks', () => {
    it('Es una función', () => {
      expect(typeof mdLinks).toBe('function');
    });
  
    it('Dede devolver el mensaje: E    R     R    O     R.    please check again!!', (done)=>{
      const resolveData = mdLinks(' ');
      resolveData.then((res)=> expect(res).toStrictEqual('E    R     R    O     R.    please check again!!')).catch((rej)=>rej);
      done();
    });

    it('Debería retornar en un array de objetos con href, text y file', (done) => {
      const resolveDataFalse = mdLinks(('Archivos-md-txt'));
      resolveDataFalse.then((res) => expect(res).toEqual(arrayFalse));
      done();
    });
  
    it('Debería retornar en un array de objetos con href, text, file, status y ok', (done) => {
      const resolveDataTrue = mdLinks(('Archivos-md-txt'), { validate: true });
      resolveDataTrue.then((res) => expect(res).toEqual(arrayTrue));
      done();
    });
  });

  const arrayURL = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\Usuario\\BOG005-md-links\\Archivos-md-txt\\Prueba\\readmePrueba.md'
    },
    
  ]
  
  const arrayLinksError = [
    {
      href: 'https://www.pixar.com/error500',
      text: 'Pruebaerror',
      file: 'C:\\Users\\Usuario\\BOG005-md-links\\Archivos-md-txt\\Prueba\\readmePrueba.md',
    },
  
  ];
  
  describe('getvalidateLinks', () => {
    it('Debería validar el estado de los links resueltos', (done) => {
      const links = [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\Usuario\\BOG005-md-links\\Archivos-md-txt\\Prueba\\readmePrueba.md',
          status: 200,
          ok: '✅'
        },
      
      ];

      getvalidateLinks(arrayURL)
        .then((data) => {
          expect(data).toEqual(links);
          done();
        });
    });

    it('Debería validar el estado de los links rechazados', (done) => {
      axios.get.mockRejectedValue('Please,check the link');
  
      const linksError = [
        {
          href: 'https://www.pixar.com/error500',
          text: 'Pruebaerror',
          file: 'C:\\Users\\Usuario\\BOG005-md-links\\Archivos-md-txt\\Prueba\\readmePrueba.md',
          status: 'Please,check the link',
          ok: '🚫'
        },
        
      ]
      getvalidateLinks(arrayLinksError)
        .then((data) => {
          expect(data).toEqual(linksError);
          done();
        });
    });
  
  });



// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
