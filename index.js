'use strict';
const request = require('request');

module.exports.isValid = cep => /^[\d]{5}-?[\d]{3}$/.test(cep);

module.exports.strip = cep => cep.replace(/[^\d]/g,'');

module.exports.findCEP = (cep, callback = null) => {
    const useCB = typeof callback == "function";

    return new Promise((resolve, reject) => {

        if(!cep) return useCB ? callback({message: 'CEP inválido', code: 400, errorCode: 'invalid'}) : reject({message: 'CEP inválido', code: 400, errorCode: 'invalid'});
        cep = this.strip(cep);
        if(!this.isValid(cep)) return useCB ? callback({ message: 'CEP inválido', code: 400, errorCode: 'invalid' }) : reject({message: 'CEP inválido', code: 400, errorCode: 'invalid'});

        request({
            uri: `https://cep.awesomeapi.com.br/json/${cep}?r=npm`,
            method: 'GET',
            headers: {
                'User-Agent': 'Request-promise; awesome-cep.npm',
                'User-Key': '3fc2702b68b95b00e61ceacdea4536eac3c911b4'
            },
            json: true
        }, (err, resp, body) => {
            if(resp.statusCode >= 400) {
                switch(+resp.statusCode) {
                    case 404:
                        return useCB ? callback({ message: `CEP não encontrado`, code: 404, errorCode: 'not_found' }) : reject({ message: `CEP não encontrado`, code: 404, errorCode: 'not_found' });
                    
                    case 400:
                        return useCB ? callback({ message: `CEP inválido`, code: 400, errorCode: 'invalid' }) : reject({ message: `CEP inválido`, code: 400, errorCode: 'invalid' });
        
                    default:
                        return useCB ? callback(err) : reject(err);
                }
            }
            try {
                useCB ? callback(null, body) : resolve(body);
            } catch(err){
                useCB ? callback(err) : reject(err);
            }
        })
    })
}