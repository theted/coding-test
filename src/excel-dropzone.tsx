import React from 'react'
import Dropzone from 'react-dropzone'
import { Box, Center } from '@northlight/ui'
import { utils, read } from 'xlsx'
import { palette } from '@northlight/tokens'
import type { UserScore } from './types'

export interface ExcelDropzoneProps {
  onSheetDrop: (rows: UserScore[]) => void
  label: string
}

export function ExcelDropzone(props: ExcelDropzoneProps) {
  const { label, onSheetDrop } = props

  function handleFile(acceptedFiles: File[]) {
    const file = acceptedFiles[0]
    const reader = new window.FileReader()
    reader.onload = function (e) {
      const data = e.target?.result
      const workbook = read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      onSheetDrop(utils.sheet_to_json(workbook.Sheets[sheetName]))
    }
    reader.readAsBinaryString(file)
  }

  return (
    <Dropzone multiple={false} onDrop={handleFile}>
      {({ getRootProps }) => (
        <Box
          {...getRootProps()}
          border="2px dashed"
          borderColor={palette.gray['200']}
          minW="20%"
          p="10"
          transition="all 400ms"
          _hover={{ bg: 'gray.100' }}
        >
          <Center height="200">{label}</Center>
        </Box>
      )}
    </Dropzone>
  )
}
