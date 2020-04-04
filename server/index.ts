import express from 'express'
import * as giphyService from "./services/giphyService";
import * as pixabayService from "./services/pixabayService";
import shuffle from 'lodash/shuffle'
import es6promise from 'es6-promise'
import 'isomorphic-fetch'

es6promise.polyfill()
const app = express()
const port = 3000

app.get('/api/items', async (req, res) => {
  const pixabayPromise = pixabayService.fetchItems(req.query.term, req.query.page)
  const giphyPromise = giphyService.fetchItems(req.query.term, req.query.page)
  const [pixabayRes, giphyRes] = await Promise.all([pixabayPromise, giphyPromise])


  const results = shuffle([
    ...pixabayRes,
    ...giphyRes
  ])

  return res.json(results)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))