const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes.js')
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// send index.html file to base endpoint
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
})

app.get('/signup', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
})

app.use((req, res) => {
    res.status(404).json("Page not found");
})

app.use((err, req, res, next) => {
    const defaultError = {
        log: "Error in unknown middleware",
        status: 400,
        message: {err: "Error sent in response"}
    }
    const errorObj = Object.assign(defaultError, err);
    return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
