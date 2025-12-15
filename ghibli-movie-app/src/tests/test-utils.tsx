import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ghibliApi } from '../services/ghibliApi';

export function renderWithProviders(ui: ReactElement) {
	const store = configureStore({
		reducer: {
			[ghibliApi.reducerPath]: ghibliApi.reducer
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(ghibliApi.middleware)
	});

	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<Provider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		);
	}

	return render(ui, { wrapper: Wrapper });
}

export const mockFilms = [
	{
		id: '1',
		title: 'Castle in the Sky',
		description:
			'A young orphan girl and a boy with a crystal pendant seek a legendary floating castle.',
		release_date: '1986',
		people: [
			'https://ghibliapi.vercel.app/people/1',
			'https://ghibliapi.vercel.app/people/2'
		]
	},
	{
		id: '2',
		title: 'My Neighbor Totoro',
		description:
			'Two sisters encounter friendly forest spirits in postwar rural Japan.',
		release_date: '1988',
		people: []
	}
];

export const mockPeople = [
	{
		id: '1',
		name: 'Monika',
		gender: 'Female',
		age: '35',
		eye_color: 'Blue'
	},
	{
		id: '2',
		name: 'Rytis',
		gender: 'Male',
		age: '33',
		eye_color: 'Blue'
	}
];
