import { describe, it, expect } from 'vitest'
import { utils, readFile } from 'xlsx'
import { mapScoresToUsers, getHighscores, toResultObject } from '../src/helpers'
import scores from '../src/scores'
import users from '../src/users'

describe('Score calculation', () => {
  it('handles scores calculation', () => {
    const mapped = mapScoresToUsers(scores, users)

    const expected = {
      Jane: 988,
      Kim: 974,
      Barry: 742,
    }

    const parsed = toResultObject(getHighscores(mapped))
    expect(parsed).toEqual(expected)
  })

  it('handles excel parsing', () => {
    const expected = {
      Steve: 989,
      Jane: 988,
      Anna: 983,
      Kim: 974,
      Pierce: 974,
      Alan: 961,
      Barry: 917,
      Hedvig: 903,
      Glen: 607,
    }

    const workbook = readFile('scores.xlsx')
    const sheetName = workbook.SheetNames[0]
    const xlsxData = utils.sheet_to_json(workbook.Sheets[sheetName])
    const mergedData = [...mapScoresToUsers(scores, users), ...xlsxData]
    const parsed = toResultObject(getHighscores(mergedData))
    expect(parsed).toEqual(expected)
  })

  it('handles multiple entries of the same username', () => {
    const initial = [{ name: 'foo', score: 100 }]

    expect(
      getHighscores([...initial, { name: 'foo', score: 200 }])[0].score
    ).toBe(200)
  })

  it('handles lower highscore posted after higher highscore', () => {
    expect(
      getHighscores([
        { name: 'foo', score: 100 },
        { name: 'foo', score: 10 },
      ])[0].score
    ).toBe(100)
  })

  it('handles case correctly', () => {
    const initial = [
      { name: 'foo', score: 100 },
      { name: 'FOO', score: 200 },
    ]

    expect(toResultObject(getHighscores(initial))).toEqual({
      Foo: 200,
    })
  })

  // NOTE: out of scope - assuming correct data
  // it('handles incorrect/missmatched data without errors', () => {
  //   const userData = [
  //     { _id: 1, name: 'Foo' },
  //     { _id: 2, name: 'Bar' },
  //   ]

  //   const scoreData = [
  //     { userId: 1, score: 100 },
  //     { userId: 10, score: 100 },
  //   ]

  //   const mapped = mapScoresToUsers(scoreData, userData)

  //   expect(mapped).toEqual([{ name: 'Foo', score: 100 }])
  // })
})
