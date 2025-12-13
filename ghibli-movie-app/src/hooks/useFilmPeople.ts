import { useState } from 'react';
import { useLazyGetPersonQuery } from '../services/ghibliApi';
import type { Film, Person } from '../types/ghibli';

export const useFilmPeople = () => {
	const [getPerson] = useLazyGetPersonQuery();
	const [people, setPeople] = useState<Person[]>([]);
	const [activeFilmId, setActiveFilmId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchPeople = async (film: Film) => {
		if (activeFilmId === film.id) return;

		setActiveFilmId(film.id);
		setError(null);

		if (
			!film.people ||
			film.people.length === 0 ||
			film.people[0].endsWith('/people/')
		) {
			setPeople([]);
			return;
		}

		setLoading(true);
		try {
			const result = await Promise.all(
				film.people.map(url => getPerson(url).unwrap())
			);
			setPeople(result);
		} catch {
			setError('Failed to load people for this film.');
		} finally {
			setLoading(false);
		}
	};

	return { people, activeFilmId, loading, error, fetchPeople };
};
