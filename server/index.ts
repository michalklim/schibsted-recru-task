import {app} from "./server";
import serverless from 'serverless-http'

if(process.env.NODE_ENV === 'development') {
  const PORT = 3000
  app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
}

export const handler = serverless(app,{
  basePath: '/.netlify/functions/index'
})