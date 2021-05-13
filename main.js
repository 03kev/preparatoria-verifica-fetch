"use strict"
const fetch = require("node-fetch")
const prompt = require("prompt-sync")()
let variables = require("./variables.js")

let url = variables.url
let name = variables.name
let color = variables.color
let operatoreEsercizio = variables.operatoreEsercizio

const restartModule = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
}

const accreditamento = (url, name) => {
    return fetch(`${url}/accreditamento`, {
        method: "post",
        body: JSON.stringify({
            nome: name
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(res => res.json())
    .then(resBody => console.log(resBody))
    .catch(err => console.log(err))
}

const voto = (url) => {
    return fetch(`${url}/voto`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => res.json())
    .then(resBody => {
        console.log(`Il tuo punteggio:`, resBody)
    })
    .catch(err => console.log(err))
}

const risEsercizio = (url, esN) => {
    return fetch(`${url}/esercizi/${esN}`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => res.json())
    .then(async resBody => {
        const data = resBody.data
        let result = await operatoreEsercizio(esN, data)

        return fetch(`${url}/esercizi/${esN}`, {
            method: "post",
            body: JSON.stringify({
                data: result
            }),
            headers: {
                "Content-Type": "application/json"
            }  
        })
    })
    .then(res => res.json())
    .then(resBody => console.log(`Esercizio ${esN}:\n`, resBody))
    .catch(err => console.log(err))
}

const conEsercizio = (url, esN) => {
    return fetch(`${url}/esercizi/${esN}`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => res.json())
    .then(resBody => {
        console.log(`Esercizio ${esN}:\n`, resBody)
    })
    .catch(err => console.log(err))
}

const menu = async (url, name, color, legend, coloredLegend) => {
    while (true) {
        color ? console.log("Opzioni di input:\n" + coloredLegend) : console.log("Opzioni di input:\n" + legend)
        let userInput = prompt()
        
        variables = restartModule("./variables.js")
        name = variables.name
        url = variables.url
        color = variables.color
        operatoreEsercizio = variables.operatoreEsercizio

        if (userInput.substring(0, 3) === "ris") {
            let risInput = userInput.slice(3)
            
            if (risInput.includes("/")) {
                let risRange = risInput.split("/")
                for (let i = +risRange[0]; i <= +risRange[1]; i++){
                    await risEsercizio(url, i)
                }
            } else if (risInput.includes(",")) {
                let risValues = risInput.split(",")
                for (let i = 0; i < risValues.length; i++){
                    await risEsercizio(url, +risValues[i])
                }
            } else {
                await risEsercizio(url, +risInput)
            }

        } else if (userInput.substring(0, 3) === "con") {
            let conInput = userInput.slice(3)
        
            if (conInput.includes("/")) {
                let conRange = conInput.split("/")
                for (let i = +conRange[0]; i <= +conRange[1]; i++){
                    await conEsercizio(url, i)
                }
            } else if (conInput.includes(",")) {
                let conValues = conInput.split(",")
                for (let i = 0; i < conValues.length; i++){
                    await conEsercizio(url, +conValues[i])
                }
            } else {
                await conEsercizio(url, +conInput)
            }

        } else if (userInput === "acc") {
            await accreditamento(url, name)

        } else if (userInput === "voto") {
            await voto(url)
            
        } else if (userInput === "q") {
            break

        } else {
            console.log("Opzione non valida, riprovare")
        }
    }
}

const coloredLegend = `\t- \x1b[31macc\x1b[0m per fare l'accreditamento
    \t- \x1b[31mvoto\x1b[0m per vedere il punteggio
    \t- \x1b[31mris {opzione}\x1b[0m per consegnare. Le varie opzioni:
        \t+ \x1b[33m{n}\x1b[0m per consegnare un solo esercizio
        \t+ \x1b[33m{n1 / n2}\x1b[0m per consegnare un range di esercizi
        \t+ \x1b[33m{n1, n2...}\x1b[0m per consegnare vari esercizi
    \t- \x1b[31mcon {opzione}\x1b[0m per vedere la consegna. Le varie opzioni:
        \t+ \x1b[33m{n}\x1b[0m per vedere una sola consegna\t\t
        \t+ \x1b[33m{n1 / n2}\x1b[0m per vedere un range di consegne\t\t
        \t+ \x1b[33m{n1, n2...}\x1b[0m per vedere varie consegne
    \t- \x1b[31mq\x1b[0m per uscire dal programma` 

const legend = `\t- 'acc' per fare l'accreditamento
    \t- 'voto' per vedere il punteggio
    \t- 'ris {opzione}' per consegnare. Le varie opzioni:
        \t+ '{n}' per consegnare un solo esercizio
        \t+ '{n1 / n2}' per consegnare un range di esercizi
        \t+ '{n1, n2...}' per consegnare vari esercizi
    \t- 'con {opzione}' per vedere la consegna. Le varie opzioni:
        \t+ '{n}' per vedere una sola consegna\t\t
        \t+ '{n1 / n2}' per vedere un range di consegne\t\t
        \t+ '{n1, n2...}' per vedere varie consegne
    \t- 'q' per uscire dal programma`

menu(url, name, color, legend, coloredLegend)