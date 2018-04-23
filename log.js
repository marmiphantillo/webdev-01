var dns = require('dns');
dns.resolve('klangboahrd.de', 'TXT', function(err, addresses) {
    console.log(err, addresses);
});