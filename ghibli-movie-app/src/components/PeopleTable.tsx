import type { Person } from '../types/ghibli';
import styles from './PeopleTable.module.css';

interface Props {
	people: Person[];
}

const PeopleTable = ({ people }: Props) => {
	return (
		<table className={styles.table}>
			<caption>Film Characters</caption>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Gender</th>
					<th>Age</th>
					<th>Eye Color</th>
				</tr>
			</thead>
			<tbody>
				{people.map((person, index) => (
					<tr key={person.id}>
						<td>{index + 1}.</td>
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
