var dns = require('dns');
dns.resolve('bartsonb.de', 'TXT', function(err, addresses) {
    console.log(err, addresses);
});