export type User = {
  _id: number
  name: string
}

export type Score = {
  userId: number
  score: number
}

export type UserScore = {
  name: string
  score: number
}

export type ResultObject = Record<string, number>
