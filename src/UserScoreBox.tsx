import { UserScore } from './types'
import { H4, Fade, Container, Box } from '@northlight/ui'

type UserScoreBoxProps = {
  name: string
  allScores: UserScore[]
}

export const UserScoreBox = ({ name, allScores }: UserScoreBoxProps) => {
  const userData = allScores
    .filter((row) => row.name === name)
    .sort((a, b) => b.score - a.score)

  return (
    <Container p="0" mb="4">
      <Fade in>
        <H4>{name}</H4>
        {userData.map((row) => {
          return <Box key={row.score}>{row.score}</Box>
        })}
      </Fade>
    </Container>
  )
}
