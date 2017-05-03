const https = require('https');
const URL = 'https://api.ellugar.co/web_client/config/';

exports.index = (req, res)=>{
    let date = new Date(Date.now());
    let year = date.getFullYear();
    let context = {
        title: '',
        description: '',
        year: year,
        preview: '',
    };

    https.get(URL, (_res) => {
        _res.on('data', (d) => {
            let context = {
                title: '',
                description: '',
                year: year,
                preview: '',
            };

            let data = JSON.parse(d);
            context.title = data.name;
            context.description = data.default_description;
            context.preview = data.default_preview;
            res.render('home', context);
        });

    }).on('error', (e) => {
        let context = {
            title: '',
            description: '',
            year: year,
            preview: '',
        };
        console.error(e);
        res.render('home', context);
    });

};
