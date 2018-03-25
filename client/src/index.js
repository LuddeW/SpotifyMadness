import './styles/main.scss'

const searchSpotifyArtist = async artistQuery => {
  const request = await fetch(`/api/spotify/search/${artistQuery}`)

  if (!request.ok) {
    console.log(`Error response from server, ${request.status}`)
  }

  const response = await request.text()
  console.log(response)
}

searchSpotifyArtist('Kendrick')
