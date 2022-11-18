import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="app">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
