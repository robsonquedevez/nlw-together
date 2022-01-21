import React, { createContext, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import appFirebase from './services/firebase';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

export const AuthContext = createContext({} as IAuthContext);

type IUserAuthenticated = {
  id: string;
  name: string;
  avatar: string;
}

type IAuthContext = {
  user?: IUserAuthenticated;
  signInWithGoogle: () => Promise<void>;
}

function App() {
  const [user, setUser] = useState<IUserAuthenticated>();

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(
            getAuth(appFirebase),
            provider
        )
        
    if(result.user) {
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    } 

  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roons/new" element={<NewRoom />} />
        </Routes>
        </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
