'use strict';
var cfg = require("config");

var kraken = require('kraken-js'),
    app = require('express')(),
    options = {
        onconfig: function (config, next) {
        	cfg['databaseConfig'] = config.get('databaseConfig');
        	cfg['i18n'] = config.get('i18n');
        	
            //any config setup/overrides here
            next(null, config);
        }
    },
    port = process.env.PORT || 8000;


app.use(kraken(options));


app.listen(port, function (err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});