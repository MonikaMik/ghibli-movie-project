import type { Film, Person } from '../types/ghibli';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ghibliApi = createApi({
	reducerPath: 'ghibliApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://ghibliapi.vercel.app/'
	}),
	endpoints: builder => ({
		getFilms: builder.query<Film[], void>({
			query: () => 'films'
		}),

		getPerson: builder.query<Person, string>({
			query: id => `people/${id}`
		})
	})
});

export const { useGetFilmsQuery, useLazyGetPersonQuery } = ghibliApi;
export default ghibliApi;
