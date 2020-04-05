import React, { ChangeEvent, FunctionComponent, useCallback, useState } from 'react'

interface Props {
  onSubmit: (query: string) => void
}

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
      <input type="text" onChange={handleChange} />
      <button type="submit"> search</button>
    </form>
  )
}
