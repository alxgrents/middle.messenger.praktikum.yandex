const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'build')));

const sendIndex = (_, res) => res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
app.get('/', sendIndex);
app.get('/messenger', sendIndex);
app.get('/error-500', sendIndex);
app.get('/error-404', sendIndex);
app.get('/sign-in', sendIndex);
app.get('/sign-up', sendIndex);
app.get('/settings', sendIndex);
app.get('/settings-redact', sendIndex);
app.get('/settings-change-password', sendIndex);

app.use('/static', express.static(path.join(__dirname, '..', 'static')));

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port.`)
});