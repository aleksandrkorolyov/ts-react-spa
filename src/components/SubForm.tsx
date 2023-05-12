import React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { UseFormRegister } from 'react-hook-form';
import { journey } from './SmartForm';

type Props = {
    expanded: string | boolean;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    typeActive: boolean;
    label: string;
    travelType: string,
    travelTypeMillageId : keyof journey,
    travelTypeTimeId: keyof journey,
    register: UseFormRegister<journey>;
}

const SubForm: React.FC<Props> = ({
    expanded,
    handleChange,
    typeActive,
    label,
    travelType,
    travelTypeMillageId,
    travelTypeTimeId,
    register,
}) => {


    return (
        <>
            <Accordion expanded={expanded === travelType} onChange={handleChange(travelType)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Plain
                    </Typography>
                    <FormControlLabel control={<Checkbox checked={typeActive} disabled/>} label={label} />
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl variant="standard">
                        <InputLabel htmlFor={travelTypeMillageId}>Millage</InputLabel>
                        <Input id={travelTypeMillageId} {...register(travelTypeMillageId)} />

                    </FormControl>
                    <FormControl variant="standard">
                        <InputLabel htmlFor={travelTypeTimeId}>Hours</InputLabel>
                        <Input id={travelTypeTimeId} {...register(travelTypeTimeId)} />
                    </FormControl>
                </AccordionDetails>
            </Accordion >
        </>
    );
}

export default SubForm;