const express = require('express');
const nightmare = require('nightmare');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/scrap', function (req, res) {
    const {
        route,
        clickItems,
        waitItems
    } = req.body;

    new nightmare()
        .goto(route)
        .click(clickItems)
        .wait(waitItems)
        .evaluate(() => {
            let data = [];
            const results = document.querySelector('video').getAttribute('src');
            return results
        })
        .end()
        .then(results => {
            console.log(results);
            res.status(200).send(results);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});


app.listen('3001');
console.log('API is running on http://localhost:8080');
module.exports = app;