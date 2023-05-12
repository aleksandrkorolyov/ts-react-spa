import React from "react";
import { useForm } from "react-hook-form";
import SubForm from "./SubForm";

export type journey = {
    fly_millage: string
    fly_hours: string
    car_millage: string
    car_hours?: string
    bike_millage: string
    bike_hours: string
    foot_millage: string
    foot_hours: string
}

const SmartForm: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const [flightActive, setFlightActive] = React.useState<boolean>(false);
    const [driveActive, setDriveActive] = React.useState<boolean>(false);
    const [ridetActive, setRideActive] = React.useState<boolean>(false);
    const [footActive, setFootActive] = React.useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<journey>()

    const [avarageSpeed, setAvargeSpeed] = React.useState<number>(0)
    const [validationError, setValidationError] = React.useState<String[]>([])



    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            changeJourneyTypeStatus(panel);
        };

    const changeJourneyTypeStatus = (panel: string) => {
        switch (panel) {
            case 'flight':
                setFlightActive(true)
                break;
            case 'car':
                setDriveActive(true)
                break;
            case 'bike':
                setRideActive(true)
                break;
            case 'foot':
                setFootActive(true)
                break;
            default:
                break;
        }
    }

    const onSubmit = handleSubmit((data) => {
        const errorLog = [];
        if (flightActive == true && (data.fly_millage == '' || data.fly_hours == '')) {
            errorLog.push('Enter fly data');
            setAvargeSpeed(0);
        }

        if (driveActive == true && (data.car_millage == '' || data.car_hours == '')) {
            errorLog.push('Enter drive data');
            setAvargeSpeed(0);
        }

        if (ridetActive == true && (data.bike_millage == '' || data.bike_hours == '')) {
            errorLog.push('Enter bike riding data');
            setAvargeSpeed(0);
        }

        if (footActive == true && (data.foot_millage == '' || data.foot_hours == '')) {
            errorLog.push('Enter go on foot data');
            setAvargeSpeed(0);
        }

        if (errorLog.length > 0) { setValidationError(errorLog) }
        else {
            setValidationError([]);

            // prosess calculation
            let totalMillage = 0;
            let totalTime = 0;
            if (flightActive === true) {
                totalMillage += Number(data.fly_millage)
                totalTime += Number(data.fly_hours)
            };
            if (driveActive === true) {
                totalMillage += Number(data.car_millage)
                totalTime += Number(data.car_hours)
            };
            if (ridetActive === true) {
                totalMillage += Number(data.bike_millage)
                totalTime += Number(data.bike_hours)
            };
            if (footActive === true) {
                totalMillage += Number(data.foot_millage)
                totalTime += Number(data.foot_hours)
            };

            setAvargeSpeed(Math.floor(totalMillage / totalTime));
        }
    })

    const ErrorList = validationError.map(error => <li>{error}</li>)

    return (
        <div>
            <form onSubmit={onSubmit}>

                <SubForm
                    expanded={expanded}
                    handleChange={handleChange}
                    typeActive={flightActive}
                    label={'I have a flight'}
                    travelType={'flight'}
                    travelTypeMillageId={'fly_millage'}
                    travelTypeTimeId={'fly_hours'}
                    register={register}
                />

                <SubForm
                    expanded={expanded}
                    handleChange={handleChange}
                    typeActive={driveActive}
                    label={'I drive a car'}
                    travelType={'car'}
                    travelTypeMillageId={'car_millage'}
                    travelTypeTimeId={'car_hours'}
                    register={register}
                />

                <SubForm
                    expanded={expanded}
                    handleChange={handleChange}
                    typeActive={ridetActive}
                    label={'I ride a byke'}
                    travelType={'bike'}
                    travelTypeMillageId={'bike_millage'}
                    travelTypeTimeId={'bike_hours'}
                    register={register}
                />

                <SubForm
                    expanded={expanded}
                    handleChange={handleChange}
                    typeActive={footActive}
                    label={'I go on foot'}
                    travelType={'foot'}
                    travelTypeMillageId={'foot_millage'}
                    travelTypeTimeId={'foot_hours'}
                    register={register}
                />

                <div className="submit_button">
                    <button type="submit" className="center">Count</button>
                </div>
            </form>
            <div>
                {ErrorList && <ul>{ErrorList}</ul>}
            </div>
            {avarageSpeed !== 0 && <div><p>Your avarage speed: {avarageSpeed} km/h</p></div>}
        </div>
    );
}

export default SmartForm;