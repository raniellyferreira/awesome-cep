'use strict';

const cep = require('../index');

// Invalid CEP
console.log('0542402 -> ', cep.isValid('0542402'));
console.log('05424020 -> ', cep.isValid('05424020'));
console.log('05424-020 -> ', cep.isValid('05424-020'));

cep.findCEP('05424020').then(resp => {
    console.log('CEP found');
    console.log(resp);
}).catch(err => console.error(err));

cep.findCEP('05424190').then(resp => console.log(resp)).catch(err => {
    console.error('CEP not found');
    console.error(err);
});

cep.findCEP('0542410').then(resp => console.log(resp)).catch(err => {
    console.error('CEP invalid format');
    console.error(err);
});
