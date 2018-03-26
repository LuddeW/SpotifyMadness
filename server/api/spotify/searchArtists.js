module.exports = async function searchArtists(ctx) {
  const { query } = ctx.params

  ctx.body = [
    {
      name: 'Kendrick',
      id: '2YZyLoL8N0Wb9xBt1NhZWg',
      images: [
        {
          height: 640,
          url:
            'https://i.scdn.co/image/3a836196bfb341f736c7fe2704fb75de53f8dfbb',
          width: 640
        },
        {
          height: 320,
          url:
            'https://i.scdn.co/image/5259c0496329b3f608a1ae0edb799cd2f8451acc',
          width: 320
        },
        {
          height: 160,
          url:
            'https://i.scdn.co/image/b772a78d4cb192268d6f601a78f21044c17d6dda',
          width: 160
        }
      ]
    },
    {
      name: 'Drake',
      id: '3TVXtAsR1Inumwj472S9r4',
      images: [
        {
          height: 640,
          url:
            'https://i.scdn.co/image/cb080366dc8af1fe4dc90c4b9959794794884c66',
          width: 640
        },
        {
          height: 320,
          url:
            'https://i.scdn.co/image/6bd672a0f33705eda4b543c304c21a152f393291',
          width: 320
        },
        {
          height: 160,
          url:
            'https://i.scdn.co/image/085ae2e76f402468fe9982851b51cf876e4f20fe',
          width: 160
        }
      ]
    }
  ]
}
