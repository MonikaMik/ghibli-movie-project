import type { Film } from '../types/ghibli';
import styles from './FilmCard.module.css';

export default function FilmCard({ film }: { film: Film }) {
	return (
		<div className={styles.card}>
			<h2>{film.title}</h2>
			<p className={styles.releaseDate}>{film.release_date}</p>
			<div className={styles.descriptionContainer}>
				<p className={styles.description}>{film.description}</p>
			</div>
		</div>
	);
}
