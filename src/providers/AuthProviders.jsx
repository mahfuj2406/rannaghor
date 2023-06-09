import React, { children, createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();


const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userSignIn =(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const signInWithGoogle = ()=>{
        return signInWithPopup(auth, googleAuthProvider);
    }

    const signInWithGitHub = () =>{
        return signInWithPopup(auth, githubAuthProvider);
    }

    const logOut =() =>{
        return signOut(auth);
    }

    const profileUpdate =(name, photo)=>{
        return updateProfile(auth.currentUser, {displayName: name,photoURL: photo});
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('auth state change', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () =>{
            unsubscribe();
        }
    }, [])
    

    const authInfo = {
        user,
        loading,
        createUser,
        signInWithGitHub,
        userSignIn,
        signInWithGoogle,
        logOut,
        profileUpdate
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;