const https = require('https');

exports.index = (req, res)=>{
    let date = new Date(Date.now());
    let year = date.getFullYear();

    res.render('home', {
        title: 'ellugar.co',
        description: 'A place with the shape of air, the habitat for work, experiments and creativity.',
        year: year,
        preview: 'preview.png',
    });
};
