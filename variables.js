"use strict"
const fetch = require("node-fetch")

// Funzione per le Fake API
const fetch_request = (url) => {
    return fetch(url).then(res => res.json())
}

let e = {}

e.url = "http://192.168.43.117:8080" // Url della verifica
e.name = "Kevin Muka" // Nome per l'accreditamento
e.color = true // Colori nel terminale: disattivare se non supportati

// Esercizi da svolgere: mettere il codice nei case e restituire il risultato.
// Quando si utilizzano dei fetch, bisogna metterci davanti un await.
e.operatoreEsercizio = async (esN, data) => {
    switch (esN) {
        case 1:
            return null

        case 2:
            return null

        case 3:
            return null

        case 4:
            return null

        case 5:
            return null

        case 6:
            return null

        case 7:
            return null
        
        default:
            return null
    }
}

module.exports = e