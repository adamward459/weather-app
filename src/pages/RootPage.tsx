import { Outlet } from 'react-router-dom';

export default function RootPage() {
  console.log('root page');
  return (
    <div className="h-screen w-screen bg-blue-100">
      <Outlet />
    </div>
  );
}
