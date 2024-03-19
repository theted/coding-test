import React, { useState, useEffect } from "react"
import { Container, Box, VStack, HStack, H1 } from "@northlight/ui"
import { ExcelDropzone, ExcelRow } from "./excel-dropzone.jsx"
import { ScoreBoard } from "./ScoreBoard"
import { mapScoresToUsers, getHighscores } from "./helpers.js"
import scores from "./scores"
import users from "./users"
import { Form } from "./Form"
import { ResultObject } from "./types"

type FormData = { name: string; score: number }

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

  const handleFormSubmit = (formData: FormData) => {
    const newHighscores: ResultObject = {
      ...highscores,
      [formData.name]: highscores[formData.name]
        ? Math.max(highscores[formData.name], formData.score)
        : formData.score,
    }

    const updatedHighscores = Object.entries(newHighscores).map(
      ([name, score]) => ({
        name,
        score,
      })
    )

    setHighscores(getHighscores(updatedHighscores))
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
