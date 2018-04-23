var dns = require('dns');
dns.resolve('www.klangboahrd.de', 'TXT', function(err, addresses) {
    console.log(err, addresses);
});