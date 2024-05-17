import { IVoteList } from 'types/voteListType'

const getVotelist = async (
  offset?: number,
  limit?: number,
  search?: string,
): Promise<IVoteList> => {
  const response = await fetch(
    `http://13.125.250.153:3000/api/votelist?offset=${offset}&limit=${limit}${search && search !== '' ? `&search=${search}` : ''}`,
    {
      cache: 'no-store',
    },
  )
  return response.json()
}

export default getVotelist
