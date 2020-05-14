'use strict';
const axios = require('axios');

const isValid = cep => /^[\d]{5}-?[\d]{3}$/.test(cep);

const strip = cep => cep.replace('-','');

const client = axios.create({
    baseURL: `https://cep.awesomeapi.com.br/json`,
    method: 'GET',
    headers: {
        'User-Agent': 'axios; awesome-cep.npm',
        'User-Key': '3fc2702b68b95b00e61ceacdea4536eac3c911b4'
    },
});

const findCEP = async (cep) => {

    if (!cep) {
        throw { message: 'CEP inválido', code: 400, errorCode: 'invalid' };
    }

    if(!isValid(cep)) {
        throw { message: 'CEP inválido', code: 400, errorCode: 'invalid' };
    }

    const cepNumber = strip(cep);

    try {
        const { data } = await client({
            url: `/${cepNumber}?r=npm`,
        });

        return data;
    } catch (err) {
        const  { response: { status } } = err;

        switch(status) {
            case 404:
                throw { message: `CEP não encontrado`, code: 404, errorCode: 'not_found' };

            case 400:
                throw { message: `CEP inválido`, code: 400, errorCode: 'invalid' };

            default:
                throw { message: err.message || '', code: 500, errorCode: 'unknown' };
        }
    }
}

module.exports = {
    strip,
    isValid,
    findCEP
}