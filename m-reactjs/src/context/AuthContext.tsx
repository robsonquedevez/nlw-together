import React, { createContext, useCallback, useEffect, useState } from 'react';
import { 
  signInWithPopup,
  GoogleAuthProvider, 
  getAuth, 
  onAuthStateChanged 
} from 'firebase/auth';
import appFirebase from '../services/firebase';

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

  const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<IUserAuthenticated>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(appFirebase),
      user => {
        if(user) {
          const { displayName, photoURL, uid } = user;
    
          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }

        return () => {
          unsubscribe();
        }
    })
  }, []);

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
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        {children}
      </AuthContext.Provider>
    );
};
  

export default AuthContextProvider;