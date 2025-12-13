import type { Film } from '../types/ghibli';
import styles from './FilmCard.module.css';

export default function FilmCard({ film }: { film: Film }) {
	return (
		<div className={styles.card}>
			<h2>{film.title}</h2>
			<p>
				<strong>Release Date:</strong> {film.release_date}
			</p>
			<p>{film.description}</p>
		</div>
	);
}
