import React from 'react'
import { filterUserScores } from './helpers'
import { UserScore } from './types'
import { H4, Fade, Container, Box } from '@northlight/ui'

type UserScoreBoxProps = {
  name: string
  allScores: UserScore[]
}

export const UserScoreBox = ({ name, allScores }: UserScoreBoxProps) => (
  <Container p="0" mb="4">
    <Fade in>
      <H4>{name}</H4>
      {filterUserScores(name, allScores).map(({ score }, index) => (
        <Box key={`${score}-${index}`}>{score}</Box>
      ))}
    </Fade>
  </Container>
)
