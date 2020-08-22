const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookinghResolver = require('./booking');


const rootResolver ={
  ...authResolver,
  ...eventsResolver,
  ...bookinghResolver

};

module.exports= rootResolver;