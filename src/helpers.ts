import { Score, User, UserScore, ResultObject } from './types'

export const ucFirst = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const ucFirstObjects = (arr: UserScore[]) => {
  return arr.map((obj) => ({
    name: ucFirst(obj.name),
    score: obj.score,
  }))
}

export const mapScoresToUsers = (
  scores: Score[],
  users: User[]
): UserScore[] => {
  const idsToUserNameMap: { [key: number]: string } = {}

  users.map((user) => {
    idsToUserNameMap[user._id] = user.name
  })

  const scoresWithUsers = scores.map((score) => {
    return {
      name: idsToUserNameMap[score.userId],
      score: score.score,
    }
  })
  // NOTE: if we assume that we might get incorrectly formated data, the following iteration will make sure that the resulting array has no mismatches
  // .filter((obj) => obj.name !== undefined)

  return scoresWithUsers
}

export const sortArrayOfObjectsByProperty = <T>(obj: T[], prop: keyof T) => {
  return obj.sort((a, b) => (b[prop] as number) - (a[prop] as number))
}

export const filterUniqueObjects = <T>(arr: T[], prop: keyof T): T[] => {
  return arr.reduce((acc: T[], obj: T) => {
    if (!acc.some((item) => item[prop] === obj[prop])) {
      acc.push(obj)
    }
    return acc
  }, [])
}

export const toResultObject = (arr: UserScore[]): ResultObject => {
  return arr.reduce((acc, obj) => {
    acc[obj.name as string] = obj.score
    return acc
  }, {} as ResultObject)
}

export const getHighscores = (arr: UserScore[]): UserScore[] => {
  const ucFirstFilterd = ucFirstObjects(arr)
  const sorted = sortArrayOfObjectsByProperty(ucFirstFilterd, 'score')
  const unique = filterUniqueObjects(sorted, 'name')
  return unique
}
