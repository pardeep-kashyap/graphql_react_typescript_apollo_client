import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createClient, Provider } from 'urql'
import './App.css'
import SignInSide from './components/login/login'
import NavBar from './components/NavBar'
import Home from './pages/home/home'
import SignUp from './pages/signUp/signUp'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token') || ''
  }
})

function App() {

  return (
    <ApolloProvider client={client}  >
      <BrowserRouter >
        <Routes>
          <Route path={"/"} element={<div>
            <NavBar />
            <Home />
          </div>} />
          <Route path={"/signIn"} element={<SignInSide />} />
          <Route path={"/signUp"} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>

  )
}

export default App

