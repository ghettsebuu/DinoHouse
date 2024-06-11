import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PanelPlay from '../components/PanelPlay/PanelPlay'; 
import PanelM from '../components/PanelMaestros/PanelM';
import Inicio from '../components/Inicio/Inicio';
import LoginEstudiante from '../components/Login/LoginEstudiante';
import LoginMaestro from '../components/Login/LoginMaestro';
import SelectLogin from '../components/Login/SelectLogin';
import { UserAuth } from "../Services/AuthContext";
import { ProtectorRuta } from "./ProtectorRuta";
import RequireStudentAuth from './RequireStudentAuth';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function Rutas() {
    const { user } = UserAuth();
    
    const RequireAuth = ({ children }) => {
        return user ? children : <Navigate to={"/SelectLogin"} />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/SelectLogin" element={<SelectLogin />} />
                <Route path="/LoginMaestro" element={<LoginMaestro />} />
                <Route path="/LoginEstudiante" element={<LoginEstudiante />} />
                <Route path="/PanelPlay" element={
                    <RequireStudentAuth>
                        <DndProvider backend={HTML5Backend}>
                            <PanelPlay />
                        </DndProvider>
                    </RequireStudentAuth>
                } />
                <Route path="/PanelM" element={<RequireAuth>
                    <PanelM />
                </RequireAuth>} />
            </Routes>
        </BrowserRouter>
    );
}
