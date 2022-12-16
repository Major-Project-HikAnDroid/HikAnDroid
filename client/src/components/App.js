import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import {Container} from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";
import PublishApplication from "./PublishApplication"
import SuccessApplication from './SuccessApplication'
import ApplicationStatus from "./ApplicationStatus";

function App() {
  return (
  
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router> 
            <AuthProvider>
              <Routes>
                <Route exact path='/' element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
                <Route path='/update-profile' element={ <PrivateRoute><UpdateProfile /></PrivateRoute> } />
                <Route path='/publish-application' element={ <PrivateRoute><PublishApplication /></PrivateRoute> } />
                <Route path='/success-application' element={ <PrivateRoute><SuccessApplication /></PrivateRoute> } />
                <Route path='/application-status' element={ <PrivateRoute><ApplicationStatus /></PrivateRoute> } />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
  );
}

export default App;
