import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom"
import PanelPlay from '../components/PanelPlay/PanelPlay'; 
import PanelM from '../components/PanelMaestros/PanelM'
import Inicio from '../components/Inicio/Inicio';
import LoginEstudiante from '../components/Login/LoginEstudiante';
import LoginMaestro from '../components/Login/LoginMaestro';
import SelectLogin from '../components/Login/SelectLogin';

import { UserAuth } from "../Services/AuthContext";
import { ProtectorRuta } from "./ProtectorRuta";



export function Rutas(){
    const {user} = UserAuth();
    const RequireAuth =({children})=>{
        return user?children: <Navigate to={"/SelectLogin"}/>;
    }

    return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/SelectLogin" element={<SelectLogin />} />
            <Route path="/LoginMaestro" element={<LoginMaestro />} />
            <Route path="/LoginEstudiante" element={<LoginEstudiante />} />
            <Route path="/PanelPlay" element={ <ProtectorRuta>
                <PanelPlay/>
            </ProtectorRuta> } />
            <Route path="/PanelM" element={<RequireAuth>
                <PanelM />
            </RequireAuth>} />
            {/* <Route path="/ActividadLv1" element={<ProtectorRuta>
                <ActividadLv1/>
            </ProtectorRuta>} /> */}

          </Routes>
        </BrowserRouter>
    )
}