import { Route, Routes } from 'react-router-dom';
import './App.css';
import Clients from './pages/Clients';
import DataProvider from './store/DataProvider';
import FormProvider from './store/FormProvider';

export default function App() {
	return (
		<div className='App'>
			<DataProvider>
				<FormProvider>
					<Routes>
						<Route path='/' element={<Clients />} />
						<Route path='/Clients' element={<Clients />} />
					</Routes>
				</FormProvider>
			</DataProvider>
		</div>
	);
}
