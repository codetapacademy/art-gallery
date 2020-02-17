import React, { useReducer, useEffect } from 'react'
import { StyledUserListItem } from './users.style'

const trierea = (state = [], action) => {
  switch (action.type) {
    case 'INIT_LIST':
      return action.list
    case 'TOGGLE_ACTIVE':
      return state.map(baiet => ({ ...baiet, active: baiet.name === action.name ? !baiet.active : baiet.active }))
    case 'CAPITALIZE':
      return state.map(baiet => ({
        ...baiet,
        isUpperCase: baiet.name === action.name
      }))
    default:
      return state
  }
}

const Users = () => {
  const [baietasii, laMaiMulti] = useReducer(trierea, [])
  const initializeList = list => {
    laMaiMulti({
      type: 'INIT_LIST',
      list
    })
  }
  useEffect(() => {
    fetch('http://localhost:2345/baietasii')
      .then(r => r.json())
      .then(list => initializeList(list))
  }, [])

  const toggleActive = name => {
    laMaiMulti({
      type: 'TOGGLE_ACTIVE',
      name
    })
  }
  const capitalize = name => {
    laMaiMulti({
      type: 'CAPITALIZE',
      name
    })
  }
  return (
    <div>
      <div>
        Users
      </div>
      {baietasii.map((baiet = {}) => (
        <StyledUserListItem
          onClick={() => toggleActive(baiet.name)}
          color={baiet && baiet.active ? 'green' : 'red'}
          key={baiet.name}
          isUpperCase={baiet.isUpperCase}
          onMouseOver={() => capitalize(baiet.name)}
        >
          {baiet.name} {baiet.age}
        </StyledUserListItem>
      ))}
    </div>
  )
}

export default Users