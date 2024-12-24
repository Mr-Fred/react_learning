import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './App'
// import {Provider} from 'react-redux'
// import { configureStore } from '@reduxjs/toolkit'
// import noteReducer from './reducers/noteReducer'
// import filterReducer from './reducers/filterReducer'
// import store from './store'

// const store = configureStore({
//   reducer: {
//     notes: noteReducer,
//     filter: filterReducer
//   }
// })

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

renderApp()
