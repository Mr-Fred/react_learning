
export const updateCache = (cache, query, addedBook) => {

  const uniqueByName = (a) => {
    let seen = Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({allBooks}) => {
    return {
      allBooks: uniqueByName(allBooks.concat(addedBook))
    }
  })
}