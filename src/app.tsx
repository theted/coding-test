import React, { useState, useEffect } from "react"
import { Container, Box, VStack, HStack, H1 } from "@northlight/ui"
import { ExcelDropzone, ExcelRow } from "./excel-dropzone.jsx"
import { ScoreBoard } from "./ScoreBoard"
import { mapScoresToUsers, getHighscores } from "./helpers.js"
import scores from "./scores"
import users from "./users"
import { Form } from "./Form"
import { UserScore } from "./types"

export default function App() {
  const [highscores, setHighscores] = useState({})

  useEffect(() => {
    const initialUserScores = mapScoresToUsers(scores, users)
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
    <Container maxW="6xl" padding="4">
      <H1 marginBottom="4">Mediatool exercise</H1>
      <HStack spacing={10} align="flex-start">
        <ExcelDropzone
          onSheetDrop={handleSheetData}
          label="Import excel file here"
        />
        <VStack align="left">
          <Box>
            <Form onFormSubmit={handleFormSubmit} />
          </Box>

          <Box>
            <ScoreBoard highscores={highscores} />
          </Box>
        </VStack>
      </HStack>
    </Container>
  )
}
