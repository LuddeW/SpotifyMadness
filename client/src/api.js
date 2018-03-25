export const request = async (method, url) => {
  const response = await fetch(url, {
    method
  })

  if (!response.ok) {
    throw new Error(response.status)
  }

  return response
    .clone()
    .json()
    .catch(() => response.clonse().text())
}

export const get = url => request('GET', url)
