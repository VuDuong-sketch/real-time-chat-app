import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import InvalidRoute from './routes/InvalidRoute';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path='/chats' element={<></>} /> {/* chưa chọn đoạn chat nào */}
            <Route path='/chats/:otherPartyId' element={<Chat />} />
          </Route>
        </Route>
        
        <Route path='*' element={<InvalidRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;