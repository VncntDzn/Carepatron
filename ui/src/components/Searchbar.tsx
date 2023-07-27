import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { StateContext } from '../store/DataProvider';
import ClientDialog from './ClientDialog';

const Searchbar = () => {
	const [isDialogOpen, setDialogVisibility] = useState(false);
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;
	const [search, setSearch] = useState('');
	const debouncedValue = useDebounce(search);
	const [filteredResults, setFilteredResults] = useState<IClient[]>([]);
	const handleDialogVisibility = () => {
		setDialogVisibility(!isDialogOpen);
	};

	const renderSearchResults = () => {
		return (
			<>
				{filteredResults.length > 0 ? (
					filteredResults.map(({ id, firstName, lastName, phoneNumber }) => (
						<Box
							key={id}
							borderBottom='1px solid #d3d3d3'
							padding='1rem'
							sx={{
								'&:hover': {
									cursor: 'pointer',
									backgroundColor: '#f5f5f5',
								},
							}}
						>
							<Typography>
								{firstName} {lastName}
							</Typography>
						</Box>
					))
				) : (
					<Typography>No results found...</Typography>
				)}
			</>
		);
	};

	useEffect(() => {
		if (clients) {
			const res = clients.filter((client) => {
				const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
				return fullName.includes(debouncedValue.toLowerCase());
			});
			setFilteredResults(res);
		}
	}, [clients, debouncedValue]);

	return (
		<>
			{isDialogOpen && <ClientDialog onClose={handleDialogVisibility} />}
			<Box display='flex' justifyContent='space-between'>
				<Box>
					<TextField
						id='outlined-basic'
						placeholder='Search clients...'
						variant='outlined'
						sx={{ position: 'relative' }}
						onChange={(e) => setSearch(e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					{debouncedValue && (
						<Box
							position='absolute'
							bgcolor='white'
							padding='1rem'
							width={300}
							zIndex={1}
							overflow='auto'
							height={250}
							maxHeight={300}
						>
							{renderSearchResults()}
						</Box>
					)}
				</Box>

				<Button
					onClick={handleDialogVisibility}
					variant='contained'
					sx={{
						// first-letter not wokring on other display attributes
						display: 'inline-block',
						textTransform: 'lowercase',
						'::first-letter': {
							textTransform: 'uppercase',
						},
					}}
				>
					Create new client
				</Button>
			</Box>
		</>
	);
};

export default Searchbar;
