#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./index.js')
const { statsValidatelinks, statsLinks } = require('./functions.js')
const figlet = require('figlet')

const argv = process.argv
const MDvalidate = process.argv[2]

console.log(chalk.cyanBright(figlet.textSync('mdLinks')));
  

const commandLine = (MDvalidate, argv) => {
    if (argv[3] === '--stats' && argv[4] === '--validate' || argv[4] === '--stats' && argv[3] === '--validate') {
        (mdLinks(MDvalidate, { validate: true }).then((response) => {
            console.log(statsValidatelinks(response))
        })).catch(reject => {
            console.log(chalk.red("Please,check the path", reject));
        })
    } else if (argv[3] === '--validate') {
        (mdLinks(MDvalidate, { validate:true}).then((response) => {
            console.log(response)
        })).catch(reject => {
            console.log(chalk.red("The file or directory does not exist", reject));
        })
    } else if (argv.length <= 3) {
        (mdLinks(MDvalidate, { validate: false }).then((response) => {
            console.log(response)
        })).catch(reject => {
            console.log(chalk.red("The route has an error.", reject));
        })
    } else if (argv[3] === '--stats') {
        (mdLinks(MDvalidate, { validate: true }).then((response) => {
            console.log(statsLinks(response))
        })).catch(reject => {
            console.log(chalk.red("The file or directory does not exist", reject));
        })
    }
    else if (argv !== '--stats' && argv !== '--validate' && argv !== undefined) {
        console.log(chalk.red("ERROR"));
    }
}

commandLine(MDvalidate, argv);
