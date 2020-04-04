import {GiphyFetch, SearchOptions} from '@giphy/js-fetch-api'

const gf = new GiphyFetch(process.env.GIPHY_TOKEN)

export const fetchGifs = (term: string, options: SearchOptions) => gf.search(term, options)