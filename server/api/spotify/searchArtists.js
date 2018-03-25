module.exports = async function searchArtists(ctx) {
  const { query } = ctx.params

  ctx.body = `You searched for ${query}`
}
