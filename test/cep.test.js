'use strict';

const cep = require('../index');

(async () => {

    // Invalid CEP
    console.log('0542402 -> ',cep.isValid('0542402'));
    console.log('05424020 -> ',cep.isValid('05424020'));
    console.log('05424-020 -> ',cep.isValid('05424-020'));

    try {
        console.log(await cep.findCEP('05424020'))
    } catch(err) {
        console.error(err);
    }

    try {
        console.log(await cep.findCEP('05424190'))
    } catch(err) {
        console.error('CEP find error');
        console.error(err);
    }

    cep.findCEP('0542410',(err, data) => {
        if(err) console.error('callback:',err)
        else console.log(data)
    })

    try {
        console.log(await cep.findCEP('0542410'))
    } catch(err) {
        console.error('CEP find error');
        console.error(err);
    }
})()