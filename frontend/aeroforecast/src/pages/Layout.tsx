import { Menubar } from 'primereact/menubar';
import flightIcon from '../assets/flight-logo.png'
import { Button } from 'primereact/button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css'
const Layout = () => {
    const location = useLocation();
    const isHomePage = (location.pathname === "/");
    const navigate = useNavigate();

    const onBackClick = () => {
        //Go to previous page
        navigate(location.pathname.substring(0, location.pathname.indexOf("/")))
    }
    const start = (
        <>
            <div className="d-flex align-items-center">
                <img alt="logo" src={flightIcon} height="40" className="mr-2"></img>
                <b>AeroForecast</b>
            </div>
        </>
    );
    const end = 
        <>
            <Button icon="pi pi-info-circle" className="t-white" label="About" severity="secondary" text />
            {!isHomePage && <Button icon="pi pi-angle-left" className="t-white" onClick={onBackClick} label="Back" severity="secondary" text />}
        </>
    return (
        <>
            <Menubar start={start} end={end} className="custom-menu-bar t-white"/>
            <Outlet />
        </>
    );
};

export default Layout;

function useRoute(): { path: any; query: any; state: any; isActive: any; } {
    throw new Error('Function not implemented.');
}
