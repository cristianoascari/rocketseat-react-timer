import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';

import { History } from './pages/History';
import { Home } from './pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Route>
    </Routes>
  );
}

// ------
// Exemplo caso quisesse ter um layout diferente para /login.
// import { LoginLayout } from './layouts/LoginLayout';
// import { Login } from './pages/Login';
// ------
/* export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Route>

      <Route path='/login' element={<LoginLayout />}>
        <Route path='/' element={<Login />} />
      </Route>
    </Routes>
  );
}*/