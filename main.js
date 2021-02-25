"use strict"
const fetch = require("node-fetch")
const prompt = require("prompt-sync")()
const variables = require("./variables.js")

const url = variables.url
const name = variables.name
const color = variables.color
const operatore_esercizio = variables.operatore_esercizio

const accreditamento = (url, name) => {
    fetch(`${url}/accreditamento`, {
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
    fetch(`${url}/voto`, {
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
    fetch(`${url}/esercizi/${esN}`, {
        method: "get",
        headers: {
            "x-data": "true"
        },
    })
    .then(res => {
        return res.json()
    })
    .then(resBody => {
        const data = resBody.data
        let result = operatore_esercizio(esN, data)

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
    fetch(`${url}/esercizi/${esN}`, {
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

const menu = (url, name, legend) => {
    console.log("Opzioni di input:\n" + legend)
    let userInput = prompt()

    while (true) {
        if (userInput.substring(0, 3) === "ris") {
            let risInput = userInput.slice(3)
            
            if (risInput.includes("/")) {
                let risRange = risInput.split("/")
                for (let i = +risRange[0]; i <= +risRange[1]; i++){
                    risEsercizio(url, i)
                }
            } else if (risInput.includes(",")) {
                let risValues = risInput.split(",")
                for (let i = 0; i < risValues.length; i++){
                    risEsercizio(url, +risValues[i])
                }
            } else {
                risEsercizio(url, +risInput)
            }
            break

        } else if (userInput.substring(0, 3) === "con") {
            let conInput = userInput.slice(3)
        
            if (conInput.includes("/")) {
                let conRange = conInput.split("/")
                for (let i = +conRange[0]; i <= +conRange[1]; i++){
                    conEsercizio(url, i)
                }
            } else if (conInput.includes(",")) {
                let conValues = conInput.split(",")
                for (let i = 0; i < conValues.length; i++){
                    conEsercizio(url, +conValues[i])
                }
            } else {
                conEsercizio(url, +conInput)
            }
            break

        } else if (userInput === "acc") {
            accreditamento(url, name)
            break

        } else if (userInput === "voto") {
            voto(url)
            break
            
        } else {
            console.log("Opzione non valida, riprovare:\n" + legend)
            userInput = prompt()
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
        \t+ \x1b[33m{n1, n2...}\x1b[0m per vedere varie consegne`

const legend = `\t- 'acc' per fare l'accreditamento
    \t- 'voto' per vedere il punteggio
    \t- 'ris {opzione}' per consegnare. Le varie opzioni:
        \t+ '{n}' per consegnare un solo esercizio
        \t+ '{n1 / n2}' per consegnare un range di esercizi
        \t+ '{n1, n2...}' per consegnare vari esercizi
    \t- 'con {opzione}' per vedere la consegna. Le varie opzioni:
        \t+ '{n}' per vedere una sola consegna\t\t
        \t+ '{n1 / n2}' per vedere un range di consegne\t\t
        \t+ '{n1, n2...}' per vedere varie consegne`

color ? menu(url, name, coloredLegend) : menu(url, name, legend)