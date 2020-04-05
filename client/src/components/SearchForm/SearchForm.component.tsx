import React, { ChangeEvent, FunctionComponent, useCallback, useState } from 'react'
import styled from 'styled-components'

interface Props {
  onSubmit: (query: string) => void
}

const Input = styled.input`
  padding: ${({ theme }) => theme.ms(1)};
  border: 4px solid ${({ theme }) => theme.colors.primary};
`

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.ms(1)};
  border: 4px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 0 ${({ theme }) => theme.ms(1)};
`

export const SearchForm: FunctionComponent<Props> = ({ onSubmit }) => {
  const [state, setState] = useState('')

  const handleSubmit = useCallback(
    (e) => {
      onSubmit(state)
      e.preventDefault()
    },
    [state, onSubmit],
  )

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" onChange={handleChange} placeholder="e.g. cats" />
      <SubmitButton type="submit">search</SubmitButton>
    </form>
  )
}
