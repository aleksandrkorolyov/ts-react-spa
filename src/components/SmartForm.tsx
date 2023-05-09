import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form";


const SmartForm: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const [flightActive, setFlightActive] = React.useState<boolean>(false);
    const [driveActive, setDriveActive] = React.useState<boolean>(false);
    const [ridetActive, setRideActive] = React.useState<boolean>(false);
    const [footActive, setFootActive] = React.useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<journey>()

    const [avarageSpeed, setAvargeSpeed] = React.useState<number>(0)
    const [validationError, setValidationError] = React.useState<String[]>([])

    type journey = {
        fly_millage: string
        fly_hours: string
        car_millage: string
        car_hours: string
        bike_millage: string
        bike_hours: string
        foot_millage: string
        foot_hours: string
    }

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const setCheckBoxTravelType = (type: string) => (event: React.SyntheticEvent) => {
        event.stopPropagation();
        changeJourneyTypeStatus(type);
    }

    const changeJourneyTypeStatus = (panel: string) => {
        switch (panel) {
            case 'flight':
                setFlightActive(prev => !prev)
                break;
            case 'car':
                setDriveActive(prev => !prev)
                break;
            case 'bike':
                setRideActive(prev => !prev)
                break;
            case 'foot':
                setFootActive(prev => !prev)
                break;
            default:
                break;
        }
    }

    const onSubmit = handleSubmit((data) => {
        const errorLog = [];
        if (flightActive == true && (data.fly_millage == '' || data.fly_hours == '')) {
            errorLog.push('Enter fly data or uncheck respective checkbox');
            setAvargeSpeed(0);
        }

        if (driveActive == true && (data.car_millage == '' || data.car_hours == '')) {
            errorLog.push('Enter drive data or uncheck respective checkbox');
            setAvargeSpeed(0);
        }

        if (ridetActive == true && (data.bike_millage == '' || data.bike_hours == '')) {
            errorLog.push('Enter bike riding data or uncheck respective checkbox');
            setAvargeSpeed(0);
        }

        if (footActive == true && (data.foot_millage == '' || data.foot_hours == '')) {
            errorLog.push('Enter go on foot data or uncheck respective checkbox');
            setAvargeSpeed(0);
        }

        if (errorLog.length > 0) { setValidationError(errorLog) }
        else {
            setValidationError([]);

            // prosess calculation
            let totalMillage = 0;
            let totalTime = 0;
            if(flightActive === true) {
                totalMillage += Number(data.fly_millage)
                totalTime += Number(data.fly_hours)};
            if(driveActive === true) {
                totalMillage += Number(data.car_millage)
                totalTime += Number(data.car_hours)};
            if(ridetActive === true) {
                totalMillage += Number(data.bike_millage)
                totalTime += Number(data.bike_hours)};
            if(footActive ===true) {
                totalMillage += Number(data.foot_millage)
                totalTime += Number(data.foot_hours)};

            setAvargeSpeed(Math.floor(totalMillage/totalTime));
        }
    })

    const ErrorList = validationError.map(error => <li>{error}</li>)

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Accordion expanded={expanded === 'flight'} onChange={handleChange('flight')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Plain
                        </Typography>
                        <FormControlLabel control={<Checkbox checked={flightActive} onChange={setCheckBoxTravelType('flight')} />} label="I have a flight" />
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="fly-millage">Millage</InputLabel>
                            <Input id="fly_millage" {...register("fly_millage")} />

                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="fly-hours">Hours</InputLabel>
                            <Input id="fly-hours" {...register("fly_hours")} />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'car'} onChange={handleChange('car')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Car</Typography>
                        <FormControlLabel control={<Checkbox checked={driveActive} onChange={setCheckBoxTravelType('car')} />} label="I drive a car" />
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="car-millage">Millage</InputLabel>
                            <Input id="car-millage" {...register("car_millage")} />
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="car-hours">Hours</InputLabel>
                            <Input id="car-hours" {...register("car_hours")} />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'bike'} onChange={handleChange('bike')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Bike
                        </Typography>
                        <FormControlLabel control={<Checkbox checked={ridetActive} onChange={setCheckBoxTravelType('bike')} />} label="I ride by bike" />
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="bike-millage">Millage</InputLabel>
                            <Input id="bike-millage" {...register("bike_millage")} />
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="bike-hours">Hours</InputLabel>
                            <Input id="bike-hours" {...register("bike_hours")} />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'foot'} onChange={handleChange('foot')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>On foot</Typography>
                        <FormControlLabel control={<Checkbox checked={footActive} onChange={setCheckBoxTravelType('foot')} />} label="I go on foot" />
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="foot-millage">Millage</InputLabel>
                            <Input id="foot-millage" {...register("foot_millage")} />
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="foot-hours">Hours</InputLabel>
                            <Input id="foot-hours" {...register("foot_hours")} />
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
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