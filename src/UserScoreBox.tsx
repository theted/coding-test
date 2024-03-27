import { UserScore } from './types'
import { H4 } from '@northlight/ui'

type UserScoreBoxProps = {
  name: string
  allScores: UserScore[]
}

export const UserScoreBox = ({ name, allScores }: UserScoreBoxProps) => {
  const userData = allScores
    .filter((row) => row.name === name)
    .sort((a, b) => b.score - a.score)

  return (
    <div>
      <H4>{name}</H4>
      <div>
        {userData.map((row) => {
          return <div key={row.score}>{row.score}</div>
        })}
      </div>
    </div>
  )
}
