# AwesomeCEP Node.js

## Instalação
```sh
$ npm i -S awesome-cep
```

## Uso simples
AwesomeCEP tem o proposito de oferecer um serviço simples e funcional.

```js
const cep = require('awesome-cep');

cep.findCEP('05424020', function (error, cepData) {
  console.error('error:', error); // Print the error if one occurred
  console.log('errorCode:', error && error.errorCode); // Print the error code ex.: invalid OR not_found
  console.log('cepData:', cepData); // Print de json with cep data
});

// OR promise
let cepData = await cep.findCEP('05424020')
```

### Response

```js
{ 
  cep: '05424020',
  address_type: 'Rua',
  address_name: 'Professor Carlos Reis',
  address: 'Rua Professor Carlos Reis',
  district: 'Pinheiros',
  city: 'São Paulo',
  state: 'SP',
  lat: '-23.5703026',
  lng: '-46.6967364',
  city_ibge: '3550308',
  ddd: '11'
}
```