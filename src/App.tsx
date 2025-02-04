import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/apollo/client';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { MainLayout } from './routes/layouts/MainLayout';
import { AuthLayout } from './routes/layouts/AuthLayout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;