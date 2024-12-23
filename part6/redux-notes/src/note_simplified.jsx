import React from 'react'
import ReactDOM from 'react-dom/client'

import reducer from './reducers/noteReducer'

import { createStore } from 'redux'

const store = createStore(reducer)

export {store};