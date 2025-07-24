import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Header } from './components/layout/Header';
import { UserList } from './pages/UserList';
import { CreateUser } from './pages/CreateUser';
import { EditUser } from './pages/EditUser';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/create" element={<CreateUser />} />
              <Route path="/edit/:id" element={<EditUser />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

//usersTestDB