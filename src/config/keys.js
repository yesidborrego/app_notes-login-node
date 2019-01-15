module.exports = {
  mongodb: {
    URI: 'mongodb://localhost:27017/login-crud'
  },
  sessionConfig: {
    secret: 'sessionappsecret',
    resave: false,
    saveUninitialized: true
  }
}