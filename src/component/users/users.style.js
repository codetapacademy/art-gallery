import styled from 'styled-components'

export const StyledUserListItem = styled.div`
  color: ${({ color }) => color};
  text-transform: ${({ isUpperCase }) => isUpperCase ? 'uppercase' : 'normal'};
`
