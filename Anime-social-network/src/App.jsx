import React from 'react'
import { Provider } from 'react-redux'
import Router from './Router'
import { SnackbarProvider } from 'notistack'

import { store } from './store'

import './styles/main.scss'

function App() {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </SnackbarProvider>
  )
}

export default App
