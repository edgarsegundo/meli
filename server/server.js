const express = require('express');
const app = express();

const PORT = process.env.PORT || 3006;

app.use(express.static('./dist/meli'));

app.listen(PORT, () => {
    console.log(`Angular is running on port ${PORT}.`);
});