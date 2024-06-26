import {useContext , createContext , useEffect ,
useState} from 'react'
import {GoogleAuthProvider , signInWithRedirect ,
signOut , onAuthStateChanged ,} from 'firebase/auth'
import {auth} from "../Firebase/firebaseConfig";


const AuthContext =createContext();
export const AuthContextProvider=({children})=>{
    const [user , setUser]=useState({});
    const googleSingnIn=()=>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth,provider);
    };
    
    const logOut = () => {
        signOut(auth)
          .then(() => {
            setUser(null); // Limpiar el usuario después de cerrar sesión
          })
          .catch((error) => {
            console.error("Error al cerrar sesión:", error);
          });
      };
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
        }, []);

    return (
        <AuthContext.Provider value={{googleSingnIn,
        logOut,user}}>
            {children}

        </AuthContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(AuthContext);
}