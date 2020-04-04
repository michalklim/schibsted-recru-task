import express from 'express'
import es6promise from 'es6-promise'
import 'isomorphic-fetch'

import {itemsRouter} from "./items";

es6promise.polyfill()

const app = express()
app.disable('x-powered-by')

app.use('/api/items', itemsRouter)
export {app}

