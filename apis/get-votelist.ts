import BASE_URL from './api-config'

const getVotelist = async (
  offset?: number,
  limit?: number,
  search?: string,
) => {
  const response = await fetch(
    `${BASE_URL}/api/votelist?offset=${offset}&limit=${limit}${search && search !== '' ? `&search=${search}` : ''}`,
    {
      cache: 'no-store',
    },
  )
  return response
}

export default getVotelist
