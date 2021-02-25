# Preparatoria Verifica Fetch

## Scrivere il codice

Modificare il codice nel file **'variables.js'**. Non toccare **'main.js'**.
    
Lì potete inserire il vostro url, il vostro nome, decidere se attivare i colori nel terminale 
e mettere il codice per le soluzioni degli esercizi.

Nella variabile **'color'** potete mettere un valore booleano. Se il vostro terminale supporta
i colori, potete impostarla a **'true'**. Se vengono mostrati dei caratteri strani, e quindi
i colori non sono supportati, impostare la variabile a **'false'**

Nella funzione **'operatore_esercizio'** potete mettere il vostro codice per risolvere gli
esercizi. E' presente uno switch, ed ogni suo case corrisponde all'esercizio da svolgere
(se scrivi il tuo codice nel case 1, la richiesta verrà fatta per l'esercizio 1)

Nel return di ogni case bisogna restituire il risultato dell'esercizio corrispondente.

## Avviare il codice

Prima di avviare il codice devi installare i moduli di node. Scrivere nel terminale:

```
npm install
```

Per avviare il codice devi scrivere nel terminale uno dei seguenti comandi:

```
npm run start
```

```
node main.js
```

## Opzioni di input

Ci sono varie opzioni di input. Bisogna scrivere nel terminale una di quelle sottostanti:

- 'acc' per fare l'accreditamento
- 'voto' per vedere il punteggio
- 'ris {opzione}' per consegnare. Le varie opzioni:
    + '{n}' per consegnare un solo esercizio
    + '{n1 / n2}' per consegnare un range di esercizi
    + '{n1, n2...}' per consegnare vari esercizi
- 'con {opzione}' per vedere la consegna. Le varie opzioni:
    + '{n}' per vedere una sola consegna
    + '{n1 / n2}' per vedere un range di consegne
    + '{n1, n2...}' per vedere varie consegne