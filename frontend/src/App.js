// import logo from './logo.svg';

import './App.css';
import "tailwindcss/tailwind.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route , Routes} from 'react-router-dom';
import ScholarDashboard from './components/studentdashboard/ScholarDashboard';
import AdminDashboard from './components/admin-dashboard/AdminDashboard';
import CompanyDashboard from './components/company-dashboard/CompanyDashboard';
import Home from './components/Home';
import Nav from './components/Nav';
import Brochure from './components/Brochure';
import Login from './components/Login';
import ScholarLogin from './components/ScholarLogin';
import Page404 from './components/Page404';
import Page500 from './components/Page500';
import Dashboard from './components/Dashboard';
import Page403 from './components/Page403';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ScholarRegistration from './components/ScholarRegistration'
import CompanyRegistration from './components/companyForm/CompanyRegistration';
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import ScholarProfile from './components/studentdashboard/scholar-profile/ScholarProfile';
import CompanyProfile from './components/company-dashboard/CompanyProfile';
import JobDesc from './components/studentdashboard/JobDesc';
import EditScholarDetails from './components/EditScholarDetails';
// import CreateUser from './components/studentdashboard/CreateUser';
import { useReducer ,createContext} from 'react';
import { reducer , initialState} from './reducer/UseReducer';
import ScholarDetails from './components/studentdashboard/ScholarDetails'
const UserContext = createContext()
function App(){

  const [state, dispatch] = useReducer(reducer, initialState)
  return(    
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Nav/>
      <Routes>
          <Route path="/scholar-registration" element={<ScholarRegistration />}/>
          <Route path="/" element={<Home />}/>
          <Route path="brochure" element={<Brochure />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="scholar-login" element={<ScholarLogin />}/>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="scholar-registration" element={<ScholarRegistration />} />
          <Route path="company-registration" element={<CompanyRegistration />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/admin" element={<AdminDashboard/>} />
          <Route path="dashboard/company" element={<CompanyDashboard/>} />
          <Route path="dashboard/scholar" element={<ScholarDashboard/>} />
          <Route path="logout" element={<Logout />} />
          <Route path="/dashboard/edit-scholar-details/:id" element={<ScholarDetails />} />
          <Route path="/dashboard/scholar-details/:id" element={<ScholarDetails />} />
          <Route path="job-desc/:username" element={<JobDesc />} />
          <Route path="/dashboard/profile" element={<CompanyProfile />} />
          <Route path="dashboard/profile" element={<ScholarProfile />} />
          <Route path="/forbidden" element={<Page403/>} />     
          <Route path="/internal-server-error" element={<Page500/>} />     
          <Route path="*" element={<Page404/>} />     
      </Routes>
      <Footer/>
     </UserContext.Provider>
    </>  
  )
}

export default App
export {UserContext}