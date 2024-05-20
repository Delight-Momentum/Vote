import { IOneVote } from 'types/voteType'

const defaultVote: IOneVote = {
  id: 0,
  title: '',
  periodStart: new Date(),
  periodEnd: new Date(),
  method: 'one',
  participantNameMethod: 'public',
  hostName: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  participantCounts: 0,
  contents: [],
}

export default defaultVote
