import { Box, Button, DialogActions, TextField, Typography } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import { FormStateContext } from '../../store/FormProvider';
import { FormTypes } from './types';

const CredentialsForm = ({ onClick }: FormTypes) => {
	const { state, dispatch } = useContext(FormStateContext);
	const [credentials, setCredentials] = useState({ firstName: '', lastName: '' });

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setCredentials((prevContact) => ({ ...prevContact, [name]: value }));
	};

	const handleContinue = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onClick!();
		dispatch({
			type: 'SET_FORM',
			data: {
				firstName: credentials.firstName,
				lastName: credentials.lastName,
			},
		});
	};
	return (
		<Box display='flex' flexDirection='column' gap={2} component='form' width={500} onSubmit={handleContinue}>
			<Box component={Typography} marginBottom={-2} variant='caption'>
				First Name
			</Box>
			<TextField name='firstName' variant='outlined' required onChange={handleChange} />
			<Box component={Typography} marginBottom={-2} variant='caption'>
				Last Name
			</Box>
			<TextField name='lastName' variant='outlined' required onChange={handleChange} />
			<Box component={DialogActions} marginTop={5}>
				<Box padding='0.6rem 2rem' component={Button} variant='contained' type='submit'>
					Continue
				</Box>
			</Box>
		</Box>
	);
};

export default CredentialsForm;
