import {app} from "./server";

if(process.env.NODE_ENV === 'development') {
  const PORT = 3000
  app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
}

if(process.env.NODE_ENV === 'production') {
  const serverless = require('serverless-http');
  module.exports.handler = serverless(app)
}