const https = require('https');
const URL = 'https://api.ellugar.co/web_client/config/1/';

exports.index = (req, res)=>{
    let date = new Date(Date.now());
    let year = date.getFullYear();

    https.get(URL, (_res) => {
        _res.on('data', (d) => {
            let data = JSON.parse(d);
            data.year = year;
            res.render('home', data);
        });

    }).on('error', (e) => {
        let context = {
            title: '',
            description: '',
            year: year,
            preview: '',
            long_description: '',
            mail: '',
            twitter: '',
            github: '',
            linkdn: '',
        };
        console.error(e);
        res.render('home', context);
    });

};
