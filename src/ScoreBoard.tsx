import React from "react"
import { UserScore } from "./types"

type ScoreBoardProps = {
  highscores: UserScore[]
}

export const ScoreBoard = ({ highscores }: ScoreBoardProps) => (
  <ul>
    {highscores.length
      ? highscores.map(({ name, score }) => (
          <li key={name}>{`${name} => ${score}`}</li>
        ))
      : null}
  </ul>
)
