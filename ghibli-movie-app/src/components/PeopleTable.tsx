import type { Person } from '../types/ghibli';

interface Props {
	people: Person[];
}

const PeopleTable = ({ people }: Props) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Gender</th>
					<th>Age</th>
					<th>Eye Color</th>
				</tr>
			</thead>
			<tbody>
				{people.map(person => (
					<tr key={person.id}>
						<td>{person.name}</td>
						<td>{person.gender}</td>
						<td>{person.age}</td>
						<td>{person.eye_color}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
export default PeopleTable;
