import { IGetVoteResponse } from 'apis/get-vote'

const defaultVote: IGetVoteResponse = {
  id: 0,
  title: '',
  periodStart: '',
  periodEnd: '',
  method: 'one',
  participantNameMethod: 'public',
  hostName: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  participantCounts: 0,
  contents: [],
}

export default defaultVote
