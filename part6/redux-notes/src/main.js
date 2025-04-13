import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './services/store.js'
import { BrowserRouter as Router } from 'react-router-dom'


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  )
}

renderApp()
