import express from 'express'
import {fetchGifs} from "./services/giphyService";
import es6promise from 'es6-promise'
import 'isomorphic-fetch'

es6promise.polyfill()
const app = express()
const port = 3000
app.get('/', (req, res) => res.send('Hello World2!'))

app.get('/giphy/:term', async (req, res) => {
  const response = await fetchGifs(req.params.term, {})

  return res.json(response)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))