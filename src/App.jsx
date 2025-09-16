import { useEffect, useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/SignUp';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import MailBox from './pages/MailBox';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { onReload } from './redux/slice/authSlicer';
function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (isLoggedIn) return
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken()
        console.log(currentUser)
        const user = { displayName: currentUser.displayName, photoURL: currentUser.photoURL, email: currentUser.email, emailVerified: currentUser.emailVerified, uid: currentUser.uid };
        dispatch(onReload({ user: user, token: token, isLoggedIn: true }))
        console.log(user)
      } else {
        dispatch(onReload({ user: null, token: null, isLoggedIn: false }))
      }
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) return (<p>Loading....</p>)
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/mail' element={<MailBox />} />
      <Route path='*' element={<p>Page not found</p>} />
    </Routes>
  )
}

export default App
