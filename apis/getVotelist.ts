// const getVotelist = async () => {
//   fetch('http://13.125.250.153:3000/api/votelist')
//     .then((res) => res)
//     .then((result) => console.log(result))
// }

// export default getVotelist

const getVotelist = async () => {
  const response = await fetch('http://13.125.250.153:3000/api/votelist', {
    cache: 'no-store',
  })
  return response.json()
}

export default getVotelist
