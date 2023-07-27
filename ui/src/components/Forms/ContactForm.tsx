import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { FormEvent, useContext, useState } from 'react';
import { createClient } from '../../services/api';
import { FormStateContext } from '../../store/FormProvider';
import { FormTypes } from './types';

const ContactForm = ({ onClick, prevStep }: FormTypes) => {
	const [isLoading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
	const { state } = useContext(FormStateContext);
	const [contact, setContact] = useState({ email: '', number: '' });

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setContact((prevContact) => ({ ...prevContact, [name]: value }));
	};

	const handleCreateClient = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createClient({
				id: nanoid(6),
				firstName: state.firstName,
				lastName: state.lastName,
				email: contact.email,
				phoneNumber: contact.number,
			});

			setSnackbar({ visible: true, message: 'Successfully created!' });
			setTimeout(() => {
				onClick!();
			}, 3000);
		} catch (error) {
			setSnackbar({ visible: true, message: 'Something went wrong.' });
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		}
	};
	return (
		<Box display='flex' flexDirection='column' gap={2} component='form' width={500} onSubmit={handleCreateClient}>
			<Box component={Typography} marginBottom={-2} variant='caption'>
				Email
			</Box>
			<TextField variant='outlined' onChange={handleChange} name='email' required type='email' />
			<Box component={Typography} marginBottom={-2} variant='caption'>
				Phone Number
			</Box>
			<TextField variant='outlined' onChange={handleChange} name='number' type='number' required />
			<Box display='flex' justifyContent='space-between' alignItems='center' marginTop={5}>
				<Box
					display='flex'
					component={Button}
					alignItems='center'
					gap={1}
					onClick={prevStep}
					disabled={isLoading}
				>
					<KeyboardBackspaceIcon
						sx={{
							color: isLoading ? 'gray' : '',
						}}
					/>
					<Typography
						sx={{
							// first-letter not wokring on other display attributes
							display: 'inline-block',
							textTransform: 'lowercase',
							'::first-letter': {
								textTransform: 'uppercase',
							},
						}}
					>
						Back
					</Typography>
				</Box>
				<Box
					padding='0.6rem 2rem'
					component={Button}
					sx={{
						backgroundColor: isLoading ? 'gray' : '',
						// first-letter not wokring on other display attributes
						display: 'inline-block',
						textTransform: 'lowercase',
						'::first-letter': {
							textTransform: 'uppercase',
						},
					}}
					variant='contained'
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Loading...' : 'Create client'}
				</Box>
			</Box>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={snackbar.visible}
				autoHideDuration={3000}
				message={snackbar.message}
			/>
		</Box>
	);
};

export default ContactForm;
