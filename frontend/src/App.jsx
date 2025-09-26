import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EventsPage from './pages/EventsPage';
import Navbar from './components/Navbar'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import MyEvents from './pages/MyEvents';


function Logout() {
  localStorage.clear();
  return <Navigate to="/login/" replace />;
}

function RegisterAndLogout() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <Register />;
}


function App() {
  return(
    <BrowserRouter>
    <Navbar />

      <Routes>

        <Route 
        path='/events/' 
        element = {
          <ProtectedRoute>
              <EventsPage />
          </ProtectedRoute>
        }
        />
        <Route path='/profile/' element = {
          <ProtectedRoute>
              <Profile />
          </ProtectedRoute>
          }
          />
        <Route path='/edit-profile/' element = {
          <ProtectedRoute>
              <EditProfile />
          </ProtectedRoute>
          }
          />
        <Route path='/create-event/' element = {
          <ProtectedRoute>
              <CreateEvent />
          </ProtectedRoute>
          }
          />

        <Route path='/edit-event/:id/' element = {
          <ProtectedRoute>
              <EditEvent />
          </ProtectedRoute>
          }
          />

        <Route path='/my-events/' element = {
          <ProtectedRoute>
              <MyEvents />
          </ProtectedRoute>
          }
          />
        
        <Route path='/' element = {<Home />} />
        <Route path='/login/' element = {<Login/>} />
        <Route path='/register/' element = {<RegisterAndLogout />} />
        <Route path='/logout/' element = {<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
