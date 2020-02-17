import React, { useReducer, useEffect } from 'react'
import { StyledUserListItem } from './users.style'

const trierea = (state = [], action) => {
  switch (action.type) {
    case 'INIT_LIST':
      return action.list
    case 'TOGGLE_ACTIVE':
      return state.map(baiet => ({ ...baiet, active: baiet.name === action.name ? !baiet.active : baiet.active }))
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
  console.log(baietasii)
  const toggleActive = name => {
    laMaiMulti({
      type: 'TOGGLE_ACTIVE',
      name
    })
  }
  return (
    <div>
      <div>
        Users
      </div>
      {baietasii.map(baiet => <StyledUserListItem onClick={() => toggleActive(baiet.name)} color={baiet.active ? 'green' : 'red'} key={baiet.name}>{baiet.name} {baiet.age}</StyledUserListItem>)}
    </div>
  )
}

export default Users