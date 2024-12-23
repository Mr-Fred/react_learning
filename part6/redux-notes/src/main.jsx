import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import {Provider} from 'react-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import { createStore, combineReducers } from 'redux'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
const store = createStore(reducer)
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(createNote('combineReducers forms one reducer from many smaller reducers'))
// store.dispatch(filterChange('IMPORTANT'))

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

// root.render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// )

renderApp()
// store.subscribe(renderApp)