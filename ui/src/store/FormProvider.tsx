import React, { createContext, useReducer } from 'react';

interface FormProviderTypes extends IClient {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}
const initialState: FormProviderTypes = {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
};

export const FormStateContext = createContext<{
	state: any;
	dispatch: React.Dispatch<Action>;
}>(
	// @ts-ignore
	null
);

export const ACTIONS = {
	SET_FORM: 'SET_FORM',
};

type Action = {
	type: keyof typeof ACTIONS;
	data: any;
};

const reducer = (state: IApplicationState, action: Action) => {
	switch (action.type) {
		case ACTIONS.SET_FORM:
			return {
				...state,
				...action.data,
			};
		default:
			return state;
	}
};

export default function FormProvider({ children }: { children?: React.ReactNode }) {
	const [state, dispatch] = useReducer<any>(reducer, initialState);

	return (
		<FormStateContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</FormStateContext.Provider>
	);
}
