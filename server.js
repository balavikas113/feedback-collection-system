const express = require('express');  
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const path = require('path');
const Feedback = require('./models/feedback');  

const app = express();  
const PORT = 7400;  

mongoose.connect('mongodb://localhost:27017/coderone_feedback')  
    .then(() => console.log('MongoDB connected successfully'))  
    .catch(err => console.error('MongoDB connection error:', err));   

app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.static('views'));

// Set view engine to handle HTML files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Feedback submission route
app.post('/submit-feedback', (req, res) => {  
    console.log('Form data received:', req.body);  
     
    if (!req.body.message) {  
        return res.status(400).send('Message is required');   
    }  

    const feedback = new Feedback({  
        name: req.body.name || 'Anonymous',  
        contactNumber: req.body.contactNumber,  
        email: req.body.email,  
        message: req.body.message,
        rating: req.body.rating
    });  

    feedback.save()  
        .then(() => {  
            // Redirect to success page instead of sending HTML directly
            res.sendFile(path.join(__dirname, 'views', 'success.html'));
        })  
        .catch(err => {  
            console.error('Error saving feedback:', err);  
            res.status(500).send('There was an error saving your feedback.');  
        });  
});

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});
