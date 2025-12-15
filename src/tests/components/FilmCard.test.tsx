import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FilmCard from '../../components/FilmCard';
import { mockFilms } from '../test-utils';

describe('FilmCard', () => {
	it('renders film title, date, and description', () => {
		render(<FilmCard film={mockFilms[0]} />);

		expect(
			screen.getByRole('heading', { name: 'Castle in the Sky' })
		).toBeInTheDocument();
		expect(screen.getByText('1986')).toBeInTheDocument();
		expect(
			screen.getByText(/A young orphan girl and a boy with a crystal pendant/)
		).toBeInTheDocument();
	});

	it('does not crash when optional data is missing', () => {
		const filmWithoutDate = { ...mockFilms[0], release_date: undefined };
		render(<FilmCard film={filmWithoutDate} />);

		expect(
			screen.getByRole('heading', { name: 'Castle in the Sky' })
		).toBeInTheDocument();
	});
});
