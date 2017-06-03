'use strict';

var express = require('express');
var sm = require('sitemap');
var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env'), silent: true });
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var ejs = require('ejs');
var port = parseInt(process.env.PORT, 10) || 8000;
var DEV = process.env.NODE_ENV !== 'production';

var app = express(),
    sitemap = sm.createSitemap({
    hostname: 'https://ellugar.co',
    cacheTime: 600000, // 600 sec - cache purge period
    urls: [{ url: '/', changefreq: 'daily', priority: 0.9 }, { url: '/projects/', changefreq: 'daily', priority: 0.8 }, { url: '/about/', changefreq: 'daily', priority: 0.7 }, { url: '/logs/', changefreq: 'daily', priority: 0.6 }, { url: '/cv/', changefreq: 'monthly', priority: 0.5 }, { url: '/ligoj/', changefreq: 'daily', priority: 0.4 }]
});

app.engine('.html', require('ejs').__express);
app.set('views', path.resolve(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/sitemap.xml', function (req, res) {
    sitemap.toXML(function (err, xml) {
        if (err) {
            return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send(xml);
    });
});

import routes from '../routes/index.jsx';
app.get('*', routes);

app.use(methodOverride());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.listen(port, '0.0.0.0', function onStart(err) {
    var info = '==> Listening on port ' + port + '. Open up http://0.0.0.0:' + port + '/ DEV: ' + DEV;
    if (err) {
        console.log(err);
    }
    console.info(info);
});
//# sourceMappingURL=index.js.map