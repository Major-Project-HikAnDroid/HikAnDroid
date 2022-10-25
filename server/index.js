const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8082;

app.get('/', (req, res) => res.send('Hello world!'));
app.listen(port, () => console.log(`Server running on port ${port}`));