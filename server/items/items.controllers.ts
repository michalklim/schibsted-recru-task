import shuffle from "lodash/shuffle";
import {RequestHandler} from "express";

import * as pixabayService from "../services/pixabayService";
import * as giphyService from "../services/giphyService";

export const getMany:RequestHandler = async (req, res) => {
  const pixabayPromise = pixabayService.fetchItems(req.query.term, req.query.page)
  const giphyPromise = giphyService.fetchItems(req.query.term, req.query.page)
  const [pixabayRes, giphyRes] = await Promise.all([pixabayPromise, giphyPromise])

  const results = shuffle([
    ...pixabayRes,
    ...giphyRes
  ])

  return res.json(results)
}

