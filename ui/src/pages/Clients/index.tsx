import { Paper, Typography } from '@mui/material';
import { memo, useContext, useEffect } from 'react';
import Page from '../../components/Page';
import Searchbar from '../../components/Searchbar';
import { getClients } from '../../services/api';
import { StateContext } from '../../store/DataProvider';
import ClientTable from './ClientTable';

function Clients() {
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;

	useEffect(() => {
		getClients().then((clients) => dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients }));
	}, [dispatch]);

	return (
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start', marginBottom: 5 }}>
				Clients
			</Typography>
			<Searchbar />
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<ClientTable clients={clients} />
			</Paper>
		</Page>
	);
}

export default memo(Clients);
