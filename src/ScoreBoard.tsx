import React from 'react'
import { UserScore } from './types'
import { Table, Thead, Tbody, Tr, Th, Td, Fade } from '@northlight/ui'

type ScoreBoardProps = {
  highscores: UserScore[]
  setSelectedUser: (name: string) => void
}

export const ScoreBoard = ({
  highscores,
  setSelectedUser,
}: ScoreBoardProps) => {
  if (!highscores.length) return null

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Score</Th>
        </Tr>
      </Thead>
      <Tbody>
        {highscores.map(({ name, score }) => (
          <Tr key={name}>
            <Td>
              <Fade in>
                <a onClick={() => setSelectedUser(name)}>{name}</a>
              </Fade>
            </Td>
            <Td>
              <Fade in>{score}</Fade>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
