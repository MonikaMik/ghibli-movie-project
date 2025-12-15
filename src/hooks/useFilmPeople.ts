import { useState } from 'react';
import { useLazyGetPersonQuery } from '../services/ghibliApi';
import type { Film, Person } from '../types/ghibli';

const extractPersonId = (url: string): string => {
	const match = url.match(/people\/(.+)$/);
	return match ? match[1] : url;
};

export const useFilmPeople = () => {
	const [getPerson] = useLazyGetPersonQuery();

	const [activeFilmId, setActiveFilmId] = useState<string | null>(null);
	const [people, setPeople] = useState<Person[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchPeople = async (film: Film) => {
		if (activeFilmId === film.id) return;

		setActiveFilmId(film.id);
		setPeople([]);
		setError(null);

		if (
			!film.people ||
			film.people.length === 0 ||
			film.people[0].endsWith('/people/')
		) {
			return;
		}

		setLoading(true);
		try {
			const result = await Promise.all(
				film.people.map((url: string) =>
					getPerson(extractPersonId(url), true).unwrap()
				)
			);
			setPeople(result);
		} catch (err) {
			console.error('Error fetching people:', err);
			setError(
				'Failed to load characters. Please check your connection and try again.'
			);
		} finally {
			setLoading(false);
		}
	};

	return { people, activeFilmId, setActiveFilmId, loading, error, fetchPeople };
};
