const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const profileModel = require('./model/profileModel');
const parser = require('body-parser')

const database = "mongodb+srv://username:password@cluster0.a6gdicd.mongodb.net/?retryWrites=true&w=majority"
const port = 3000;
const app = express()

mongoose.connect(database).then(() => {
    console.log('Conneted to MongoDB successfully');
    app.listen(port, () => {
        console.log(`Application listening to port ${port}`)
    });
    
}).catch((err => console.log(err)))


app.set('view engine', 'ejs');

//*********************Middleware **********************/
app.use(parser.urlencoded({extended : false}))
//*********************Middleware END**********************/

// *********************Routes*********************** //

app.get('/', function (req, res) {
    profileModel.find().then( (result) => {
        res.render('app', {data : result});
    } ).catch(err => console.log(err));
})

app.get('/profile-data/:id', (req, res) => {
    profileModel.findById(req.params.id).then(result => res.json(result)).catch(err => console.log(err));
}) 

app.get('/profile/:id', (req, res) => {
    profileModel.findById(req.params.id).then(result => {
        res.render('profile', { data : result });
    }).catch(err => console.log(err))
})

app.get('/new-profile', (req, res) => {
    res.render('new-profile')
})

app.post('/add-profile', (req, res) => {
    const newProfile = new profileModel(req.body);
    newProfile.save().then( () => {
        res.redirect('/')
    } ).catch( err => console.log(err) )
})

app.delete('/remove-profile/:id', (req, res) => {
    profileModel.findByIdAndDelete(req.params.id).then( () => {
        let msg = 'Deleted Profile Successfully';
        res.json({msg : msg})
    }).catch(err => console.log(err))
})

app.patch('/update-profile/:id', (req, res) => {
    profileModel.findByIdAndUpdate(req.params.id, req.body).then( () => {
        res.json({ response : "The item was updated successfully" })
    } ).catch( err => console.log(err) )
})


app.use((req, res) => {
    res.statusCode = 404;
    res.render('404');
})
// *********************Routes End*********************** //


