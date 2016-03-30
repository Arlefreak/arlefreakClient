import http from 'http';
import assert from 'assert';
import path from 'path';
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

import '../lib/index.js';
var port = parseInt(process.env.PORT, 10) || 8000;

describe('Example Node Server', () => {
    it('should return 200', done => {
        http.get('http://127.0.0.1:' + port, res => {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});
