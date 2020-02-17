import React, { useEffect, useReducer, useRef } from 'react';
import { render } from 'react-dom';
import Users from './component/users';

const artGalleryReducer = (state = [], action) => {
  switch (action.type) {
    case 'init':
      return action.payload.map(value => ({ value, edit: false }))
    case 'add-new':
      return [...state, { value: action.value, edit: false }]
    case 'remove':
      return state.filter((n, i) => i !== action.index)
    case 'change':
      return state.map(({ value, edit }) => ({
        value: edit ? action.value : value,
        edit,
      }))
    case 'edit':
      return state.map((v, k) => ({
        value: v.value,
        edit: k === action.index ? true : false,
      }))
    case 'terminat':
      return state.map(({ value }) => ({ value, edit: false }))
    default:
      return state
  }
}
const apiURL = 'http://localhost:2345/';

const AddNewArt = ({ updateAgeR }) => {
  const ceFaceUseRefulAsta = useRef();

  const handleSubmit = e => {
    e.preventDefault()
    const { value } = ceFaceUseRefulAsta.current
    if (value.trim().length) {
      updateAgeR({
        type: 'add-new',
        value
      })
      ceFaceUseRefulAsta.current.value = ''
    }
    console.log()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" autoFocus ref={ceFaceUseRefulAsta} />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}


const ArtGallery = () => {

  const [ageR, updateAgeR] = useReducer(artGalleryReducer, ['Loading ...'])

  useEffect(() => {
    // fetch(`${apiURL}altceva`)
    //   .then(data => data.json())
    //   .then(data => {

    //     updateAgeR({
    //       type: 'init',
    //       payload: [44, 22, 55]
    //     })

    //     updateAgeR({
    //       type: 'revert'
    //     })
    //   })
  }, [])

  const deleteValue = index => updateAgeR({
    type: 'remove',
    index
  })

  const editValue = index => updateAgeR({
    type: 'edit',
    index
  })

  const handleOnChange = e => {
    const { value } = e.target
    updateAgeR({
      type: 'change',
      value
    })
  }

  const save = e => {
    e.preventDefault()
  }

  const handleOnKey = e => {
    console.log(e.key)
    e.preventDefault()
    e.key === 'Enter' && updateAgeR({
      type: 'terminat'
    })
  }

  return (
    <div>
      <Users />
      <span>ART</span> <span>GALLERY</span>
      {/* <div>
        <AddNewArt updateAgeR={updateAgeR} />
      </div>
      <div>
        {ageR.map((el, index) => (
          <form onSubmit={save} key={index}>
            <button
              onClick={() => editValue(index)}
            >
              Edit
            </button>
            {el.edit ? <input value={el.value} onChange={handleOnChange} /> : el.value}
            <button
              onClick={() => deleteValue(index)}
            >
              Delete
            </button>
          </form>
        ))}
      </div> */}
    </div>
  )
};

render(<ArtGallery />, document.querySelector('#root'));
