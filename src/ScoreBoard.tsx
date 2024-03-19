import React from "react"
import { ResultObject } from "./types"

type ScoreBoardProps = {
  highscores: ResultObject
}

export const ScoreBoard = ({ highscores }: ScoreBoardProps) => {
  return (
    <>
      <ul>
        {Object.keys(highscores).map((key) => (
          <li key={key}>{`${key} => ${highscores[key]}`}</li>
        ))}
      </ul>
    </>
  )
}
