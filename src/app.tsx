import React, { useState, useEffect } from 'react'
import { Container, Box, VStack, HStack, H1 } from '@northlight/ui'
import { ExcelDropzone, ExcelRow } from './excel-dropzone.jsx'
import { ScoreBoard } from './ScoreBoard'
import { mapScoresToUsers, getHighscores } from './helpers.js'
import scores from './scores'
import users from './users'
import { Form } from './Form'
import { UserScore } from './types'

const initialUserScores = mapScoresToUsers(scores, users)

export default function App() {
  const [highscores, setHighscores] = useState({})

  useEffect(() => {
    const initialHighscores = getHighscores(initialUserScores)
    setHighscores(initialHighscores)
  }, [])

  function handleSheetData(data: ExcelRow[]) {
    const newHighscores = getHighscores([...initialUserScores, ...data])
    setHighscores(newHighscores)
  }

  const handleFormSubmit = (formData: UserScore) => {
    setHighscores(getHighscores([...highscores, formData]))
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

        <Box>
          <ScoreBoard highscores={highscores} />
        </Box>
      </HStack>
    </Container>
  )
}
