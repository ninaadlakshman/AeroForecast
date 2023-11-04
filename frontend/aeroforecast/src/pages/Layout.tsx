import { Menubar } from 'primereact/menubar';
import flightIcon from '../assets/flight-logo.png'
import { Button } from 'primereact/button';
import { Outlet } from 'react-router-dom';
import './Layout.css'
const Layout = () => {
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
        </>
    return (
        <>
            <Menubar start={start} end={end} className="custom-menu-bar t-white"/>
            <Outlet />
        </>
    );
};

export default Layout;