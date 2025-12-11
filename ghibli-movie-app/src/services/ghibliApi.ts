import type { Film, Person } from '../types/ghibli';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: `https://ghibliapi.vercel.app/` }),
	endpoints: build => ({
		filmsList: build.query<Film[], void>({
			query: () => `films`
		}),
		peopleList: build.query<Person, { id: string }>({
			query: ({ id }) => `people/${id}`
		})
	})
});

export const { useFilmsListQuery, usePeopleListQuery } = api;
export default api;
