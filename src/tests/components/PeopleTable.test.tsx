import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PeopleTable from '../../components/PeopleTable';
import { mockPeople } from '../test-utils';

describe('PeopleTable', () => {
	it('renders table with people data', () => {
		render(<PeopleTable people={mockPeople} />);

		expect(screen.getByRole('table')).toBeInTheDocument();
		expect(screen.getByText('Monika')).toBeInTheDocument();
		expect(screen.getByText('Rytis')).toBeInTheDocument();
	});
});
