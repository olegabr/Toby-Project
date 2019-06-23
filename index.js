var Web3 = require('web3');
var abi = require('./abi.json');

const registrarAddress = '0xF0AD5cAd05e10572EfcEB849f6Ff0c68f9700455';

const API_KEY = "PUT_YOUR_INFURA_PROJECT_ID_HERE";
const web3Endpoint = 'https://mainnet.infura.io/v3/' + API_KEY;
var web3 = new Web3(new Web3.providers.HttpProvider(web3Endpoint));
var registrar = new web3.eth.Contract(abi, registrarAddress);

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
	try {
		var name = line;
		registrar.methods.available(name).call({}, function(err, available) {
			if (err) {
				console.log(err);
				return;
			}
			if (available) {
				console.log(line, "not registered")
			} else {
				console.log(line, "registered")
			}
		});

	} catch (err) {
		console.error(err)
	}

})
