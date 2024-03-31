import React from 'react'
import { useForm, Form, TextField, Button, Stack } from '@northlight/ui'

type FormData = {
  name: string
  score: string
}

type FormProps = {
  onFormSubmit: (data: FormData) => void
}

export const ScoreForm = ({ onFormSubmit }: FormProps) => {
  const initialValues = { name: '', score: '' }

  const validation = (values: any) => {
    const errors: any = {}
    if (values.name.length < 1) {
      errors.name = {
        message: 'Name is required',
      }
    }

    if (values.score.length === 0) {
      errors.score = { message: 'Score is required' }
    } else if (isNaN(Number(values.score))) {
      errors.score = { messsage: 'Score must be a number' }
    } else if (values.score < 1) {
      errors.score = { message: 'Score must be a positive number' }
    }

    return errors
  }

  const methods = useForm({
    defaultValues: initialValues,
    mode: 'onSubmit',
    resolver: (values) => {
      return {
        values,
        errors: validation(values),
      }
    },
  })

  return (
    <Form
      initialValues={initialValues}
      validate={validation}
      methods={methods}
      onSubmit={(values) => {
        onFormSubmit(values)
        methods.reset()
        methods.setFocus('name')
      }}
    >
      <Stack spacing={4}>
        <TextField name="name" label="Name" autoFocus />
        <TextField name="score" label="Score" type="number" />
        <Button type="submit" variant="brand">
          Submit
        </Button>
      </Stack>
    </Form>
  )
}
