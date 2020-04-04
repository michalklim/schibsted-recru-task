interface ImageResponse {
  src: string,
  size: {
    height: number,
    width: number
  },
}


interface Item {
  type: 'photo' | 'gif'
  id: string
  image: ImageResponse
  preview: ImageResponse
  preview_static: ImageResponse
}