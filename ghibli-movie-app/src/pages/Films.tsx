import { useRef, useEffect, useState } from 'react';
import { useGetFilmsQuery } from '../services/ghibliApi';
import { useFilmPeople } from '../hooks/useFilmPeople';
import FilmCard from '../components/FilmCard';
import PeopleList from '../components/PeopleList';
import PeopleTable from '../components/PeopleTable';
import styles from './Films.module.css';
import type { Film } from '../types/ghibli';

const Films = () => {
	const { data: films, isLoading, error: filmsError } = useGetFilmsQuery();
	const { people, activeFilmId, setActiveFilmId, loading, error, fetchPeople } =
		useFilmPeople();

	const dialogRef = useRef<HTMLDialogElement>(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	// Update isMobile on resize
	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mediaQuery.addEventListener('change', handleResize);
		return () => mediaQuery.removeEventListener('change', handleResize);
	}, []);

	// Open dialog when selecting a film on mobile
	useEffect(() => {
		if (isMobile && activeFilmId) {
			dialogRef.current?.showModal();
		}
	}, [activeFilmId, isMobile]);

	const handleShowPeopleClick = (film: Film) => {
		fetchPeople(film);
		setActiveFilmId(film.id);
	};

	const handleCloseDialog = () => {
		dialogRef.current?.close();
		setActiveFilmId(null);
	};

	if (isLoading) return <p>Loading films...</p>;
	if (filmsError) return <p>Error loading films</p>;

	return (
		<article>
			<h1>Films</h1>

			{/* Films list */}
			<ul className={styles.filmList}>
				{films?.map(film => (
					<li
						key={film.id}
						className={styles.filmContainer}
					>
						<FilmCard film={film} />
						<button
							onClick={() => handleShowPeopleClick(film)}
							className={activeFilmId === film.id ? styles.active : ''}
						>
							Show people
						</button>
					</li>
				))}
			</ul>

			{/* Desktop table */}
			{!isMobile && activeFilmId && (
				<section aria-label='People in selected film'>
					{loading ? (
						<p>Loading people...</p>
					) : error ? (
						<p>{error}</p>
					) : people.length > 0 ? (
						<PeopleTable people={people} />
					) : (
						<p>No people to display</p>
					)}
				</section>
			)}

			{/* Mobile dialog */}
			{isMobile && activeFilmId && (
				<dialog
					ref={dialogRef}
					className={styles.peopleDialog}
					onClick={e => {
						if (e.currentTarget === e.target) handleCloseDialog();
					}}
				>
					<button
						onClick={handleCloseDialog}
						className={styles.closeButton}
						aria-label='Close'
					>
						✕
					</button>

					{loading ? (
						<p>Loading people...</p>
					) : error ? (
						<p>{error}</p>
					) : people.length > 0 ? (
						<PeopleList people={people} />
					) : (
						<p>No people to display</p>
					)}
				</dialog>
			)}
		</article>
	);
};

export default Films;
