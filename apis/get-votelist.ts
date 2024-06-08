import BASE_URL from './api-config'

type VoteListParams = {
  offset?: number
  limit?: number
  search?: string
  order?: 'popular' | 'open'
}

const buildQueryString = (params: VoteListParams): string => {
  return (
    Object.entries(params)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')
  )
}

const getVotelist = async (params: VoteListParams = {}): Promise<Response> => {
  const queryString = buildQueryString(params)
  const response = await fetch(`${BASE_URL}/api/votelist?${queryString}`, {
    cache: 'no-store',
  })
  return response
}

export default getVotelist
