import fetch from 'isomorphic-fetch'
import qs from 'querystring'

export const fetchGifs = (term: string, options: {}) => {
  const params = {
    key: process.env.PIXABAY_TOKEN || '',
    q: term
  }

  return fetch(`https://pixabay.com/api?${qs.stringify(params)}`).then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }

    return response.json()
  })
}