import { MediatoolThemeProvider } from '@northlight/ui'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Container, Fade } from '@northlight/ui'
import App from '../src/app'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <MediatoolThemeProvider>
    <Fade in duration={1000}>
      <Container
        minWidth="100%"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        bgGradient="radial(mediatoolBlue.900, mediatoolBlue.800)"
      >
        <App />
      </Container>
    </Fade>
  </MediatoolThemeProvider>
)
