import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import Navigation from '../../components/Navigation';

describe('Navigation', () => {
	it('renders navigation with About and Films links', () => {
		renderWithProviders(<Navigation />);

		expect(screen.getByRole('navigation')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute(
			'href',
			'/'
		);
		expect(screen.getByRole('link', { name: /Films/i })).toHaveAttribute(
			'href',
			'/films'
		);
	});
});
