import express from 'express'
import es6promise from 'es6-promise'
import 'isomorphic-fetch'
import cors from 'cors'
import morgan from 'morgan'
import { itemsRouter } from './items'
import serverless from 'serverless-http'

es6promise.polyfill()

const app = express()

app.disable('x-powered-by')

const morganFormat = process.env.CONTEXT === 'production' ? 'tiny' : 'dev'
app.use(morgan(morganFormat))

if (!!process.env.CONTEXT) {
  app.use(
    cors({
      origin: process.env.URL,
    }),
  )
}

app.use('/api/items', itemsRouter)
export { app }

export const handler = serverless(app, {
  basePath: '/.netlify/functions/index',
})
