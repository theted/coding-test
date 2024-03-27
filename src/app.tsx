import React, { useState, useEffect } from 'react'
import { Container, Box, HStack, H1, Link } from '@northlight/ui'
import { ExcelDropzone } from './excel-dropzone.jsx'
import { ScoreBoard } from './ScoreBoard'
import { mapScoresToUsers, getHighscores } from './helpers.js'
import scores from './scores'
import users from './users'
import { ucFirst } from './helpers.js'
import { Form } from './Form'
import { UserScore } from './types'
import { UserScoreBox } from './UserScoreBox'

export default function App() {
  const [highscores, setHighscores] = useState<UserScore[]>([])
  const [allScores, setAllScores] = useState<UserScore[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  useEffect(() => {
    const initialUserScores = mapScoresToUsers(scores, users)
    const initialHighscores = getHighscores(initialUserScores)
    setAllScores(initialUserScores)
    setHighscores(initialHighscores)
  }, [])

  useEffect(() => {
    setHighscores(getHighscores(allScores))
  }, [allScores])

  const handleSheetData = (data: UserScore[]) => {
    setAllScores([...allScores, ...data])
  }

  const handleFormSubmit = ({ name, score }: UserScore) => {
    setAllScores([...allScores, { name: ucFirst(name), score }])
  }

  return (
    <Container
      maxW="4xl"
      padding="10"
      background="#f9f9f9"
      boxShadow="1px 1px 50px rgba(0, 0, 0, 0.2)"
      borderRadius="12px"
      bgGradient="linear(gray.50, gray.100)"
    >
      <H1 marginBottom="4" style={{ fontWeight: 300 }}>
        Mediatool exercise
      </H1>
      <HStack
        spacing={10}
        align="flex-start"
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
      >
        <ExcelDropzone
          onSheetDrop={handleSheetData}
          label="Import excel file here"
        />
        <Box>
          <Form onFormSubmit={handleFormSubmit} />
        </Box>

        {selectedUser ? (
          <Box>
            <UserScoreBox name={selectedUser} allScores={allScores} />
            <Link onClick={() => setSelectedUser(null)}>
              Back to highscores
            </Link>
          </Box>
        ) : (
          <Box>
            <ScoreBoard
              highscores={highscores}
              setSelectedUser={setSelectedUser}
            />
          </Box>
        )}
      </HStack>
    </Container>
  )
}
