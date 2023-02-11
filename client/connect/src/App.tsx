import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import AddNew from './pages/AddNew/AddNew'
import Home from './pages/home/home'
import SignInSide from './pages/login/login'
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
          <Route path={"/"} element={<div className='home-page'>
            <NavBar />
            <Home />
          </div>} />
          <Route path={"/signIn"} element={<SignInSide />} />
          <Route path={"/signUp"} element={<SignUp />} />
          <Route path={"/new"} element={<AddNew />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>

  )
}

export default App

