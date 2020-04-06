import React, { ChangeEvent, FunctionComponent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'components/Button'

interface Props {
  onSubmit: (query: string) => void
  className?: string
}

const Form = styled.form`
  display: flex;
`

const Input = styled.input`
  padding: ${({ theme }) => theme.ms(1)};
  border: 4px solid ${({ theme }) => theme.colors.primary};
  min-width: 0;
  max-width: auto;
  flex-grow: 1;
`

const SubmitButton = styled(Button)`
  margin: 0 0 0 ${({ theme }) => theme.ms(-8)};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin: 0 0 0 ${({ theme }) => theme.ms(1)};
  }
`

export const SearchForm: FunctionComponent<Props> = ({ onSubmit, className }) => {
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
    <Form onSubmit={handleSubmit} className={className}>
      <Input type="text" onChange={handleChange} placeholder="e.g. cats" size={15} />
      <SubmitButton type="submit">search</SubmitButton>
    </Form>
  )
}
