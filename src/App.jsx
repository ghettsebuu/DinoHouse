// App.js
import React from 'react';
import { AuthContextProvider ,UserAuth } from "./Services/AuthContext";
import {Rutas} from './routers/routes'

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