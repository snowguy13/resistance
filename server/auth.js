const fs = require('fs');

const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync( process.env.AUTH_PRIVATE_KEY_PATH );
const publicKey = fs.readFileSync( process.env.AUTH_PUBLIC_KEY_PATH );

// {[string]: Array<string>}
// Maps usernames to the list of tokens active for that user.
const userTokens = {};
const addJwtIdForUser = (username, jwtid) =>
  userTokens[ username ]
    ? userTokens[ username ].push( jwtid )
    : userTokens[ username ] = [ jwtid ];
const removeJwtIdForUser = (username, jwtid) =>
  userTokens[ username ] && userTokens[ username ].splice(
    userTokens[ username ].indexOf( jwtid ),
    1
  );

const JWT_ID_CHARS = 'abcdefghijklmnopqrstuvwxyz1234567890';
const generateJwtId = (length = 30) => {
  let id = '';

  for( let i = 0; i < length; i++ ) {
    id += JWT_ID_CHARS[ Math.floor( Math.random()*JWT_ID_CHARS.length ) ];
  }

  return id;
};

const ALG = 'RS256';

const sign = (payload, expiresIn = '24 hrs') => new Promise(
  (resolve, reject) => {
    const jwtid = generateJwtId();
    console.log(`jwtid is ${jwtid}`);
    jwt.sign(
      payload,
      privateKey,
      {
        algorithm: ALG,
        expiresIn,
        notBefore: Math.floor( Date.now() / 1000 ),
        jwtid,
      },
      (error, token) => {
        console.log(error, token);
        error
          ? reject( error )
          : resolve({ jwtid, token })
      }
    )
  }
);

const verify = (token) => new Promise(
  (resolve, reject) => jwt.verify(
    token,
    publicKey,
    {
      algorithms: [ ALG ],
    },
    (error, payload) => error
      ? reject( error )
      : resolve( payload )
  )
);

const authenticate = (username, password) => new Promise(
  (resolve, reject) => setTimeout(
    () => {
      console.log(`Authenticating ${username}, ${password}`);
      return Math.random() > 0.5
        ? resolve( username )
        : reject("Bad Login")
    },
    1000 + Math.random()*2000
  )
);

exports.logIn = (username, password) =>
  authenticate( username, password )
    .catch( (error) => { throw { message: error } })
    .then( (username) => sign({ username }) )
    .catch( (error) => { throw { message: error.message } })
    .then(
      ({ jwtid, token }) => {
        addJwtIdForUser( username, jwtid );
        return token;
      }
    )
