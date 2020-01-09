const express = require('express');
const app = express();

const Joi = require('@hapi/joi')

const schema = Joi.object ({
    name: Joi.string().min(3).max(30).required(),
    titles: Joi.number().max(10000)
})

app.use(express.json());

const port = process.env.PORT || 2999;

//learning more about object manipulation in action
let genres = [{ name: "SciFi", titles: 1048 }, {name: "Adventure",titles: 552 }];

app.listen(port, () => console.log('listening...'));

app.get('/genres', (req, res) => {
    try {
        res.send(genres);
    } catch (err) {
        console.log(err);
    }
});

app.post('/genres', (req, res) => {
    try {

        // {name}  = req.body.name       Is there destructuring that works like that? 
        // {titles} = req.body.titles 
        let obj = new Object;

        obj.name = req.body.name;
        obj.titles = req.body.titles;

        let result = schema.validate(obj);

        console.log(result);

        genres.push(obj)

        console.log('post invoked..');
        res.send(genres);
        
    } catch (err) {
        console.log(err);
        
    }
})

//do a patch

//do a delete

app.delete( '/genres/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('NOT FOUND...');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)
} )
