import React, { useState, useRef, FormEvent } from "react"
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/react"
import { P, Field } from "@northlight/ui"

type FormData = {
  name: string
  score: number
}

type FormProps = {
  onFormSubmit: (data: FormData) => void
}

export const Form = ({ onFormSubmit }: FormProps) => {
  const [name, setName] = useState("")
  const [score, setScore] = useState<number | null>()
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const updateField = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setError(false)
    if (name === "name") setName(value)
    if (name === "score") setScore(Number(value))
  }

  const validateAndSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!name || !score) {
      setError(true)
      return
    }

    onFormSubmit({ name, score })
    setName("")
    setScore(null)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={validateAndSubmit}>
      <FormControl isInvalid={error} mb="4">
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={name}
          onInput={updateField}
          ref={inputRef}
        />
      </FormControl>

      <FormControl isInvalid={error} mb="4">
        <FormLabel htmlFor="score">Score</FormLabel>
        <Input
          type="number"
          name="score"
          value={score ? score.toString() : ""}
          onInput={updateField}
        />
      </FormControl>

      {error && <P>Both fields are required</P>}

      <Button mt={2} colorScheme="teal" type="submit">
        Submit
      </Button>
    </form>
  )
}
