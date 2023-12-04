import { Card } from 'primereact/card';
import AirlineSelect from '../components/AirlineSelect';
import { createSearchParams, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const onSubmit = (info: any) => {
        const params = {
            airlineCode: info.airline.code,
            flightNumber: info.flightNumber,
            flightDate: info.flightDate
        }
        navigate({
            pathname: "/prediction",
            search: `?${createSearchParams(params)}`,
        })
    }
    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Get Your Flight Delay/Cancellation Prediction...</h1>
            <Card className="w-75">
                <AirlineSelect onSubmit={onSubmit}></AirlineSelect>
            </Card>
        </div>
    );
};

export default HomePage;