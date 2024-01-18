import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Homepage';
import Navbar from './components/Navbar/Navbar';
import Signup from './pages/Signup';
import SignIn from './pages/Signin';
import AccountsPage from './pages/AccountPage';
import PageNotFound from './pages/404pagenotfound';
import { useState } from 'react';
import context from './context/navContext';


function App() {
  const [hidden, setHidden] = useState();
  const notFound = (hide) => {
    setHidden(hide);
  }
  return (
    <>
      <context.Provider value={{ hidden, notFound }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='account' element={<AccountsPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </>
  )
}

export default App;
