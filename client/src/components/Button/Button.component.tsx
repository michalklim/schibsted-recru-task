import React, { FunctionComponent, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Btn = styled.button`
  padding: ${({ theme }) => theme.ms(1)};
  border: 4px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.secondary};
  transition: opacity 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:disabled,
  &[disabled] {
    opacity: 0.6;
    pointer-events: none;
  }
`

export const Button: FunctionComponent<Props> = ({ ...props }) => {
  return <Btn {...props} />
}
