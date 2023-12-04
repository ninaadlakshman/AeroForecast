import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller, DeepMap, FieldError } from "react-hook-form"
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './AirlineSelect.css';
import { classNames } from 'primereact/utils';
import { Airline, usAirlines } from '../interfaces/airline';
import { Calendar } from 'primereact/calendar';
import { convertDateToString } from '../utility/formatter';

interface AirlineSelectProps {
    onSubmit: (info: {airline: Airline, flightNumber: string}) => void;
}

type FormValues = {
    airline: Airline | undefined;
    flightNumber: string | undefined;
    flightDate: Date | undefined;
};

type CustomFieldError = {
    message: string;
};
const AirlineSelect: React.FC<AirlineSelectProps> = (props) => {
    const defaultValues = {
        airline: undefined,
        flightNumber: undefined,
        flightDate: undefined
    };
    const {
        control,
        formState,
        handleSubmit,
    } = useForm<FormValues>({ defaultValues });
    const [flightCode, setFlightCode] = useState("XX")
    const { errors } = formState as { errors: DeepMap<FormValues, CustomFieldError> };

    const onSubmit = (data: any) => {
        // Handle form submission logic here
        const formatted = {
            airline: data.airline,
            flightNumber: data.flightNumber,
            flightDate: convertDateToString(data.flightDate)
        }
        console.log(formatted);
        props.onSubmit(formatted);
    };

    
    const selectedAirlineTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className="d-flex align-items-center">
                    <img src={option.imgSrc} className="mr-2" style={{ height: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const airlineOptionTemplate = (option: any) => {
        return (
            <div className="d-flex align-items-center">
                <img src={option.imgSrc} className="mr-2" style={{ height: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    const getFormErrorMessage = (name: 'airline' | 'flightNumber' | 'flightDate') => {
        if (errors[name]) {
            let message = (errors[name] as any).message;
            return <small className="p-error">{message}</small>;
        }
    };

    const updateAirlineInput = (inputtedAirline: Airline) => {
        if (!inputtedAirline) {
            return;
        }
        const airline = usAirlines.find((airline) => airline.name === inputtedAirline.name)
        setFlightCode(airline?.code ?? "")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column flex-shrink">
                <div className="d-flex flew-row">
                    <div className="d-flex flex-column mr-2 w-50">
                        <label htmlFor="flight_number" className="font-bold block mb-2">Airline</label>
                        <Controller
                            name="airline"
                            control={control}
                            rules={{ required: 'Airline is required.' }}
                            render={({ field, fieldState }) => (
                                <Dropdown
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => {
                                        updateAirlineInput(e.value)
                                        field.onChange(e.value)}}
                                    options={usAirlines}
                                    optionLabel="name"
                                    placeholder="Select an airline"
                                    focusInputRef={field.ref}
                                    filter
                                    valueTemplate={selectedAirlineTemplate}
                                    itemTemplate={airlineOptionTemplate}
                                    className={classNames({ 'p-invalid': fieldState.error, 'w-full': true, "md:w-14rem": true })}
                                    />
                                )}
                            />
                        {getFormErrorMessage('airline')}
                    </div>
                    <div className="d-flex flex-column justify-content-center mr-2">
                        <label htmlFor="flight_number" className="font-bold block mb-2">Flight Number</label>
                        <div className="d-flex flex-row align-items-center">
                            <div className="mr-1">
                                <strong>{flightCode}</strong>
                            </div>
                            <Controller
                                name="flightNumber"
                                control={control}
                                rules={{ required: 'Flight number is required.' }} 
                                render={({field, fieldState}) => (
                                    <InputNumber
                                        id={field.name}
                                        value={field.value ? +field.value : undefined}
                                        format={false}
                                        onChange={(e) => field.onChange(e.value)}
                                        className={classNames({ 'p-invalid': fieldState.error })}
                                        />
                                )}
                                />
                        </div>
                        {getFormErrorMessage('flightNumber')}
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="flight_number" className="font-bold block mb-2">Flight Date:</label>
                        <div className="d-flex flex-row align-items-center">
                            <Controller
                                name="flightDate"
                                control={control}
                                rules={{ required: 'Flight date is required.' }} 
                                render={({field, fieldState}) => (
                                    <Calendar
                                        id={field.name}
                                        value={field.value}
                                        dateFormat="yy-mm-dd"
                                        onChange={(e) => field.onChange(e.value)}
                                        className={classNames({ 'p-invalid': fieldState.error })}
                                        />
                                )}
                                />
                        </div>
                        {getFormErrorMessage('flightDate')}
                    </div>
                </div>
                <Button type="submit" label="Submit" raised className="mt-2 custom-button-bg"></Button>
            </div>
        </form>
    )
};    


export default AirlineSelect;
