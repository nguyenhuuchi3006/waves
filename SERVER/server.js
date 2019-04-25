const express = require('express');

const app = express();

const port = process.env.PORT ||3002;     // gán port bằng 1 enviroment variable

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening on port ${port}!`));

// - chạy thì thay vì nodemon SERVER/server.js mà ta chạy yarn run server (vì
//     đã cài đặt ở package.json)