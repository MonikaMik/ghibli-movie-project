import type { Person } from '../types/ghibli';
import styles from './PeopleList.module.css';

interface PeopleListProps {
	people: Person[];
}

export default function PeopleList({ people }: PeopleListProps) {
	return (
		<ul className={styles.list}>
			{people.map((person, index) => (
				<li
					key={person.id}
					className={styles.item}
				>
					<h3>
						{index + 1}. {person.name}
					</h3>

					<div className={styles.row}>
						<span>Gender</span>
						<span>{person.gender}</span>
					</div>

					<div className={styles.row}>
						<span>Age</span>
						<span>{person.age}</span>
					</div>

					<div className={styles.row}>
						<span>Eye color</span>
						<span>{person.eye_color}</span>
					</div>
				</li>
			))}
		</ul>
	);
}
