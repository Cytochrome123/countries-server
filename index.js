require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Country = require('./model/country');

const app = express();

mongoose.connect(process.env.MONGO_URL, (err, conn) => {
	if (err) {
		console.log('Mongo error ', err);
	} else {
		console.log('Mongoose Connection is Successful');
	}
});

app.use(express.json())
app.use(cors({
    // origin: "https://getcontries.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
    optionsSuccessStatus: 200,
    

}))
// app.use(cors())


app.get('/api', async (req, res) => {
    try {
        let options = { lean: true, sort: {name: 1} }
        const countries = await Country.find({}, null, options)
        // console.log(countries)

        if (countries) res.status(200).json({ msg: 'Countries compiled', countries })
        else res.status(400).json({ msg: 'Couldn\'t load' })
    } catch (err) {
        throw err;
    }
});

app.get('/api/:code/details', async (req, res) => {
    try {
        const { code } = req.params;

        const country = await Country.findOne( {alpha2Code: code} );

        if (country) res.status(200).json({ msg: 'Details found', country })
        else res.status(200).json({ msg: '' })
    } catch (err) {
        throw err;
    }
});

app.get('/api/name/:search', async (req, res) => {
    try {
        const { search } = req.params;

        const country = await Country.find( { name: { $regex: search } });
        // {name: /.*search.*/} --- passng the dirt string

        if (country) res.status(200).json({ msg: 'Details found', country })
        else res.status(200).json({ message: 'fdv'})
    } catch (err) {
        throw err;
    }
})


app.listen(process.env.PORT || 8080, (err) => {
    if (err) console.log(err)
    else console.log('Server')
})