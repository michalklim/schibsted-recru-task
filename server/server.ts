import express from 'express'
import es6promise from 'es6-promise'
import 'isomorphic-fetch'
import cors from 'cors'
import {itemsRouter} from "./items";

es6promise.polyfill()

const app = express()
app.disable('x-powered-by')
app.use(cors({
  origin: process.env.URL || 'http://localhost:3000'
}))

app.use('/api/items', itemsRouter)
export {app}

