import { Score, User, UserScore, ResultObject } from "./types"

export const ucFirst = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const ucFirstObjects = (arr: UserScore[]) => {
  return arr.map((obj) => ({
    name: ucFirst(obj.name),
    score: obj.score,
  }))
}

export const mapScoresToUsers = (scores: Score[], users: User[]) => {
  return scores.map((scoreObj) => ({
    name: users.find((user) => user._id === scoreObj.userId)?.name,
    score: scoreObj.score,
  }))
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
  const sorted = sortArrayOfObjectsByProperty(ucFirstFilterd, "score")
  const unique = filterUniqueObjects(sorted, "name")
  return unique
}
