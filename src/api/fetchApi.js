export async function fetchCategoriesData() {
  try {
    const url = new URL('https://techcrunch.com/wp-json/wp/v2/categories')

    Object.entries({
      page: 1,
      per_page: 100
    }).forEach(([key, value]) => {
      if (value !== null) {
        url.searchParams.append(key, value)
      }
    })

    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function fetchPostsData(params) {
  try {
    const urlMap = {
      starwars: 'https://swapi.dev/api/planets',
      techCrunch: 'https://techcrunch.com/wp-json/wp/v2/posts'
    };
    const selectedUrl = urlMap[params.url] || urlMap.techCrunch;
    const url = new URL(selectedUrl);


    Object.entries({
      ...params
    }).forEach(([key, value]) => {
      if (value != null) {
        url.searchParams.append(key, value)
      }
    })
    const response = await fetch(url)
    const data = await response.json()

    if(params.url === 'starwars') {
      return data.results
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
