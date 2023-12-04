import { Menubar } from 'primereact/menubar';
import flightIcon from '../assets/flight-logo.png'
import { Button } from 'primereact/button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css'
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
const Layout = () => {
    const location = useLocation();
    const isHomePage = (location.pathname === "/");
    const navigate = useNavigate();
    const [aboutVisible, setAboutVisible] = useState(false);

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
            <Button icon="pi pi-info-circle" className="t-white" label="About" severity="secondary" text onClick={() => setAboutVisible(true)}/>
            <Dialog header="About Us" visible={aboutVisible} style={{ width: '50vw' }} onHide={() => setAboutVisible(false)}>
                <p className="m-0">
                    Made by Ninaad L., Kartik N., Nathan W., Aryan M., Jaegook K., Amish S.
                </p>
                <p className="m-0">
                    For our CSE-6242 Data Viz class at Georgia Tech with Professor Polo Chau
                </p>
            </Dialog>
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
