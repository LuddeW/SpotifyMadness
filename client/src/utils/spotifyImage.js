export const MEDIUM_SIZE = 300

export const smallImage = images =>
  !images || !images.length
    ? null
    : images.reduce((res, cur) => (cur.width < res.width ? cur : res))

export const mediumImage = images =>
  !images ? null : images.find(image => image.width === MEDIUM_SIZE)

export const largeImage = images =>
  !images || !images.length
    ? null
    : images.reduce((res, cur) => (cur.width > res.width ? cur : res))
