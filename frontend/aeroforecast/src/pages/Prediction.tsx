import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import PredictionPie from '../components/PredictionPie';
import './Prediction.css'
import { Message } from 'primereact/message';
import PredictionChart from '../components/PredictionChart';

const Prediction = () => {
    return (
        <div className="h-100 mt-2 g-2 container">
            <div className="row">
                <div className="col">
                    <Card className="h-100" title="Flight Prediction">
                        <div className="d-flex flex-column justify-content-center h-100">
                            <Message
                                className="custom-message"
                                severity="success"
                                text="Likely On-Time" />
                            <p className="m-0 mt-2 text-center">
                                We predict, with high likelihood, that your flight will depart on time. Looks like you won't have to wait!
                            </p>
                        </div>
                    </Card>
                </div>
                <div className="col card flex justify-content-center">
                    <Card className="h-100">
                        <div className="d-flex justify-content-center flex-column h-100">
                            <PredictionPie/>
                        </div>
                    </Card>
                </div>
                <div className="col">
                    <Card className="h-100">
                        <div className="d-flex justify-content-center flex-column h-100">
                            <PredictionChart/>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="row h-50 mt-2">
                <Card className="col-sm-12 mr-2" title="Flight Prediction">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Prediction;