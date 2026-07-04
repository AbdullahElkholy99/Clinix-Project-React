import { Outlet } from 'react-router-dom';

import PatientNavBar from './Navbar';
import DocNavbar from '../DoctorComponents/Bases/NavBar/Navbar';
import PatientFooter from './Footer';
import DocFooter from '../HomeComponents/Footer/Footer';

function MainLayout() {
  const userRole = localStorage.getItem("userRole");
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      {userRole === 'Doctor' ? (<DocNavbar /> ) 
      : (<PatientNavBar />)}
      <main className="flex-grow">
        <Outlet /> 
      </main>
      
      
      {userRole === 'Doctor' ? (<DocFooter /> ) 
      : (<PatientFooter />)}
    </div>
  );
}
export default MainLayout;