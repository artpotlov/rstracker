import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
