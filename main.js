#!/usr/bin/env node

const fs = require('fs')
const chalk = require('chalk')

if (process.argv.length < 3) {
    console.log(chalk.red('Please provide a source file'))
    return
}

let sourcePath = process.argv[2]

const caseClassRegex = /(case)\s+(class)\s+(\w+)\s+\(\s*(\s*\w+\s*:\s*\w+\s*,?)*\s*\)/g
const propertiesRegex = /\w+\s*:\s*\w+/g

if (!fs.existsSync(sourcePath)) {
    console.log(chalk.red('Could not find provided source file'))
    return
}

let typeMap = {
    Int: 'number',
    String: 'string',
    Double: 'number',
    Float: 'number',
    Boolean: 'boolean',
    Char: 'char'
}

function getType(key) {
    // TODO: Check for Optional and List

    return typeMap[key] || 'any';
}

data = fs.readFileSync(sourcePath, 'utf8')
results = Array.from(data.matchAll(caseClassRegex), x => x[0])

results.forEach(caseClass => {

    caseClassRegex.lastIndex = 0
    let tokens = caseClassRegex.exec(caseClass)
    let className = tokens[3]

    console.log(`Generating TypeScript for class: ${chalk.yellow(className)}`)


    let tsClass = `
// Typerift v1.0.2
// Generated from ${sourcePath} on ${new Date()}
// Do not modify this file directly!

interface ${className} {\n`

    let properties = caseClass.match(propertiesRegex)

    properties.forEach(property => {
        let pair = property.split(':')
        pair = pair.map(x => x.trim())

        let type = getType(pair[1])
        tsClass += `    ${pair[0]}: ${type};  // ${pair[1]}\n`
    })

    tsClass += '}\n'

    fs.writeFile(`${className}.ts`, tsClass, (err, file) => {

        if (err) {
            console.log(chalk.red(err))
        }

    })
})