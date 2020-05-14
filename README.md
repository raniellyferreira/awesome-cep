# AwesomeAPI CEP

## Instalação
```sh
$ npm i awesome-cep
```

## Uso simples
AwesomeAPI tem o proposito de oferecer um serviço simples e funcional. Fonte https://docs.awesomeapi.com.br/api-cep

```js
const cep = require('awesome-cep');

cep.findCEP('05424020').then(resp => {
  
  console.log(resp.address_name); // ~~> Professor Carlos Reis

}).catch(console.error)
```

### Response

```js
{ 
  cep: '05424020',
  address_type: 'Rua',
  address_name: 'Professor Carlos Reis',
  address: 'Rua Professor Carlos Reis',
  state: 'SP',
  district: 'Pinheiros',
  city: 'São Paulo',
  state: 'SP',
  lat: '-23.5703026',
  lng: '-46.6967364',
  city_ibge: '3550308',
  ddd: '11'
}
```