import { IVoteList } from 'types/voteListType'

const getVotelist = async (offset: number): Promise<IVoteList> => {
  const response = await fetch(
    `http://13.125.250.153:3000/api/votelist?offset=${offset}&limit=8`,
    {
      cache: 'no-store',
    },
  )
  return response.json()
}

export default getVotelist
