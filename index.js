const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
require('dotenv').config();

app.use(express.json());

const { ConnectDBLocal, ConnectDBOnline } = require('./config/db');
ConnectDBLocal();

const whitelist = ['http://localhost:5174', 'http://example2.com'];
const corsOptions = {
  origin: function (origin, cb) {
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
};
// app.use(cors(corsOptions));
app.use(cors());

const routerV1 = require('./src/routes/RouterV1');
app.use('/api', routerV1);

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
