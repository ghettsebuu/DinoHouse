// App.js
import React from 'react';
import { AuthContextProvider ,UserAuth } from "./Services/AuthContext";
import {Rutas} from './routers/routes'
import './App.css';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Rutas/>
       
      </AuthContextProvider>
    </div>
  );
}

export default App;