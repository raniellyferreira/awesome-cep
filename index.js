'use strict';
const axios = require('axios');

const isValid = cep => /^[\d]{5}-?[\d]{3}$/.test(cep);

const strip = cep => cep.replace(/[^\d]/g,'');

const findCEP = async (cep) => {
    const cepNumber = strip(cep);

    return new Promise((resolve, reject) => {

        if (!cepNumber) {
            return reject({message: 'CEP inválido', code: 400, errorCode: 'invalid'});
        }
    
        if(!isValid(cepNumber)) {
            return reject({message: 'CEP inválido', code: 400, errorCode: 'invalid'});
        }

        axios({
            url: `https://cep.awesomeapi.com.br/json/${cepNumber}?r=npm`,
            method: 'GET',
            headers: {
                'User-Agent': 'Request-promise; awesome-cep.npm',
                'User-Key': '3fc2702b68b95b00e61ceacdea4536eac3c911b4'
            }
        }).then(({ data }) => {
            resolve(data);
        }).catch((err) => {
            const  { response: { status, data } } = err;

            switch(status) {
                case 404:
                    return reject({ message: `CEP não encontrado`, code: 404, errorCode: 'not_found' });
                
                case 400:
                    return reject({ message: `CEP inválido`, code: 400, errorCode: 'invalid' });
    
                default:
                    return reject(err);
            }
        });
    })
}

module.exports = {
    strip,
    isValid,
    findCEP
}