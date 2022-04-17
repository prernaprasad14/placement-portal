// import logo from './logo.svg';

import './App.css';
import "tailwindcss/tailwind.css"
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route , Routes} from 'react-router-dom';
import Dashboard from './components/studentdashboard/Dashboard';
import Home from './components/Home';
import Nav from './components/Nav';
import Brochure from './components/Brochure';
import Login from './components/Login';
import ScholarLogin from './components/ScholarLogin';
import Page404 from './components/Page404';
import Page403 from './components/Page403';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ScholarRegistration from './components/ScholarRegistration'
import CompanyRegistration from './components/companyForm/CompanyRegistration';
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import ScholarProfile from './components/studentdashboard/scholar-profile/ScholarProfile';
import CreateUser from './components/studentdashboard/CreateUser';


function App(){


  return(    
    <>
      <Nav/>
      <Routes>
          <Route path="/scholar-registration" element={<ScholarRegistration />}/>
          <Route path="/" element={<Home />}/>
          <Route path="brochure" element={<Brochure />}/>
          <Route path="login" element={<Login />}/>
          <Route path="scholar-login" element={<ScholarLogin />}/>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="scholar-registration" element={<ScholarRegistration />} />
          <Route path="company-registration" element={<CompanyRegistration />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="dashboard/scholar" element={<Dashboard/>} /> */}
          <Route path="dashboard/companies" element={<Dashboard/>} />
          <Route path="dashboard/create-user" element={<CreateUser/>} />
          <Route path="logout" element={<Logout />} />
          <Route path="/profile/:id" element={<ScholarProfile />} />
          <Route path="/forbidden" element={<Page403/>} />     
          <Route path="*" element={<Page404/>} />     
      </Routes>
      <Footer/>
    </>  
  )
}

export default App
