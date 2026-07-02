import { Outlet } from 'react-router-dom';
import NavBar from './Navbar'; 
import Footer from './Footer'; 

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      <NavBar />

      <main className="flex-grow">
        <Outlet /> 
      </main>
      
      <Footer/>
    </div>
  );
}
export default MainLayout;