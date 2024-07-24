import React, { useEffect, useState } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import axios from 'axios';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Detail from './routes/detail.js';
import Home from './routes/home.js';
import Login from './routes/login.js';
import Navigation from './layout/nav.js';
import Join from './routes/join.js';
import Browse from './routes/browse.js';
import Profile from './routes/profile.js';

const App =()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    useEffect(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        setCsrfToken(token);
        const checkSession = async () => {
            try {
                const response = await axios.get("/api/checkSession", { 
                    withCredentials: true, 
                    headers: { 'X-XSRF-TOKEN': token }
                });
                console.log("Authenticated response:", response.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.log("Not Authenticated", error.response || error.message);
                setIsAuthenticated(false);
            }
        };
        checkSession();
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/:memberId/board/:boardId" element={<><Navigation /><Detail/></>} />
                <Route path="/browse" element={<><Navigation /><Browse/></>}/>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/home" element={isAuthenticated ? 
                                                    <><Navigation /> <Home /> </>
                                                    : <Navigate to ="/login" />} />
                <Route path="/join" element={<Join/>} />
                <Route path="/:memberId/profile" element={<><Navigation /><Profile/></>} />
            </Routes>
        </div>
    );
}

export default App;