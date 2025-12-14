import { useState } from 'react';
import { useLazyGetPersonQuery } from '../services/ghibliApi';
import type { Film, Person } from '../types/ghibli';

export const useFilmPeople = () => {
	const [getPerson] = useLazyGetPersonQuery();

	const [activeFilmId, setActiveFilmId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [peopleCache, setPeopleCache] = useState<Record<string, Person[]>>({});

	const fetchPeople = async (film: Film) => {
		if (activeFilmId === film.id) return;

		setActiveFilmId(film.id);
		setError(null);

		if (peopleCache[film.id]) return;

		if (
			!film.people ||
			film.people.length === 0 ||
			film.people[0].endsWith('/people/')
		) {
			setPeopleCache(prev => ({ ...prev, [film.id]: [] }));
			return;
		}

		setLoading(true);
		try {
			const result = await Promise.all(
				film.people.map(url => getPerson(url).unwrap())
			);
			setPeopleCache(prev => ({ ...prev, [film.id]: result }));
		} catch {
			setError('Failed to load people for this film.');
		} finally {
			setLoading(false);
		}
	};

	const people = activeFilmId ? peopleCache[activeFilmId] || [] : [];

	return { people, activeFilmId, setActiveFilmId, loading, error, fetchPeople };
};
