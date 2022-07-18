const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

app.listen(PORT, () => console.log(`Server started on ${PORT} port.`));