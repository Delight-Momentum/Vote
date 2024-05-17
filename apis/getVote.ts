const getVote = async (id: number) => {
  const response = await fetch(
    `http://13.125.250.153:3000/api/votelist/${id}`,
    {
      cache: 'no-cache',
    },
  )

  return response.json()
}

export default getVote
