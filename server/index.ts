import express from 'express'
import * as giphyService from "./services/giphyService";
import * as pixabayService from "./services/pixabayService";

import es6promise from 'es6-promise'
import 'isomorphic-fetch'

es6promise.polyfill()
const app = express()
const port = 3000
app.get('/', (req, res) => res.send('Hello World2!'))

app.get('/giphy/:term', async (req, res) => {
  const response = await giphyService.fetchGifs(req.params.term, {})

  return res.json(response)
})

app.get('/pixabay/:term', async (req, res) => {
  const response = await pixabayService.fetchGifs(req.params.term, {})

  return res.json(response)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))