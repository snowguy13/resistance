const fs = require('fs');

const jwt = require('jsonwebtoken');

const privateKeyFile = fs.readFileSync( process.env.AUTH_PRIVATE_KEY_PATH );
const secret = process.env.AUTH_SECRET;
