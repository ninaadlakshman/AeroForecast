import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller, DeepMap, FieldError } from "react-hook-form"
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import './AirlineSelect.css';
import { classNames } from 'primereact/utils';
import { Airline, usAirlines } from '../interfaces/airline';

interface AirlineSelectProps {
    onSubmit: (info: {airline: Airline, flightNumber: string}) => void;
}

type FormValues = {
    airline: Airline | undefined;
    flightNumber: string | undefined;
};

type CustomFieldError = {
    message: string;
};
const AirlineSelect: React.FC<AirlineSelectProps> = (props) => {
    const defaultValues = {
        airline: undefined,
        flightNumber: undefined
    };
    const {
        control,
        formState,
        setValue,
        handleSubmit,
        watch
    } = useForm<FormValues>({ defaultValues });
    const flightNumberWatch = watch('flightNumber');
    const { errors } = formState as { errors: DeepMap<FormValues, CustomFieldError> };
    useEffect(() => {}, [flightNumberWatch])
    const onSubmit = (data: any) => {
        // Handle form submission logic here
        data = (data as {airline: Airline, flightNumber: string})
        props.onSubmit(data);
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

    const getFormErrorMessage = (name: 'airline' | 'flightNumber') => {
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
        setValue('airline', airline)
        setValue('flightNumber', airline?.code)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column">
                <div className="d-flex flew-row">
                    <div className="d-flex flex-column mr-2 w-50">
                        <label htmlFor="airline" className="font-bold block mb-2">Airline</label>
                        <Controller
                            name="airline"
                            control={control}
                            rules={{ required: 'Airline is required.' }}
                            render={({ field, fieldState }) => (
                                <Dropdown
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => updateAirlineInput(e.value ?? '')}
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
                    <div className="d-flex flex-column w-50">
                        <label htmlFor="flight_number" className="font-bold block mb-2">Flight Number</label>
                        <Controller
                            name="flightNumber"
                            control={control}
                            rules={{ required: 'Flight number is required.' }} 
                            render={({field, fieldState}) => (
                                <InputMask
                                    id={field.name}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    mask="aa999"
                                    className={classNames({ 'p-invalid': fieldState.error })}
                                    placeholder="AA123"/>
                            )}
                            />
                        {getFormErrorMessage('flightNumber')}
                    </div>
                </div>
                <Button type="submit" label="Submit" raised className="mt-2 custom-button-bg"></Button>
            </div>
        </form>    
    )
};    


export default AirlineSelect;
