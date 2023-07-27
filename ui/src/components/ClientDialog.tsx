import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    Typography
} from '@mui/material';
import { useState } from 'react';
import ContactForm from './Forms/ContactForm';
import CredentialsForm from './Forms/CredentialsForm';

const ClientDialog = ({ onClose }: { onClose: () => void }) => {
	const [activeStep, setActiveStep] = useState(0);

	const handleNextStep = () => {
		setActiveStep((prevVal) => prevVal + 1);
	};
	const handlePrevStep = () => {
		setActiveStep((prevVal) => prevVal - 1);
	};
	const renderFormContent = () => {
		switch (activeStep) {
			case 0:
				return <CredentialsForm onClick={handleNextStep} />;

			case 1:
				return <ContactForm onClick={onClose} prevStep={handlePrevStep} />;

			default:
				return <Typography>No content to be displayed.</Typography>;
		}
	};
	return (
		<Dialog open maxWidth='lg'>
			<Box display='flex' justifyContent='space-between' paddingRight='1rem' alignItems='center'>
				<DialogTitle>Create new client</DialogTitle>
				<IconButton onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</Box>
			<DialogContent>
				<Stepper activeStep={activeStep}>
					<Step
						sx={{
							'& .MuiStepLabel-root .Mui-completed': {
								color: 'green', // circle color (COMPLETED)
							},
							'& .MuiStepLabel-label.Mui-completed': {
								color: 'black !important', // label color (COMPLETED)
							},
						}}
					>
						<StepLabel>Personal Details</StepLabel>
					</Step>
					<Step
						sx={{
							'& .MuiStepLabel-root .Mui-completed': {
								color: 'green', // circle color (COMPLETED)
							},
							'& .MuiStepLabel-label.Mui-completed': {
								color: 'black !important', // label color (COMPLETED)
							},
						}}
					>
						<StepLabel>Contact Details</StepLabel>
					</Step>
				</Stepper>

				<Box marginTop={5}>{renderFormContent()}</Box>
			</DialogContent>
		</Dialog>
	);
};
export default ClientDialog;
