import { useEffect, useState } from 'react';
import { useGetFilmsQuery } from '../services/ghibliApi';
import { useFilmPeople } from '../hooks/useFilmPeople';
import FilmCard from '../components/FilmCard';
import PeopleDialog from '../components/PeopleDialog';
import PeopleTable from '../components/PeopleTable';
import styles from './Films.module.css';
import type { Film } from '../types/ghibli';

const Films = () => {
	const { data: films, isLoading, error: filmsError } = useGetFilmsQuery();
	const { people, activeFilmId, setActiveFilmId, loading, error, fetchPeople } =
		useFilmPeople();

	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mediaQuery.addEventListener('change', handleResize);
		return () => mediaQuery.removeEventListener('change', handleResize);
	}, []);

	const handleShowPeopleClick = (film: Film) => {
		fetchPeople(film);
	};

	const handleCloseDialog = () => {
		setActiveFilmId(null);
	};

	if (isLoading) {
		return (
			<article aria-busy='true'>
				<h1>Films</h1>
				<p role='status'>Loading films...</p>
			</article>
		);
	}

	if (filmsError) {
		return (
			<article>
				<h1>Films</h1>
				<div
					role='alert'
					className={styles.errorBox}
				>
					<p>
						<strong>Error:</strong> Unable to load films. Please check your
						internet connection and try again.
					</p>
					<button
						onClick={() => window.location.reload()}
						className={styles.retryButton}
					>
						Retry
					</button>
				</div>
			</article>
		);
	}

	return (
		<article>
			<h1>Films</h1>

			{/* Films list */}
			<ul
				className={styles.filmList}
				role='list'
			>
				{films?.map((film: Film) => (
					<li
						key={film.id}
						className={styles.filmContainer}
					>
						<FilmCard film={film} />
						<button
							onClick={() => handleShowPeopleClick(film)}
							className={activeFilmId === film.id ? styles.active : ''}
							aria-label={`Show characters from ${film.title}`}
							aria-pressed={activeFilmId === film.id}
						>
							Show people
						</button>
					</li>
				))}
			</ul>

			{/* Desktop table */}
			{!isMobile && activeFilmId && (
				<section
					aria-label='People in selected film'
					aria-live='polite'
				>
					{loading ? (
						<p role='status'>Loading people...</p>
					) : error ? (
						<p role='alert'>{error}</p>
					) : people.length > 0 ? (
						<PeopleTable people={people} />
					) : (
						<p>No people to display</p>
					)}
				</section>
			)}

			{/* Mobile dialog */}
			{isMobile && activeFilmId && (
				<PeopleDialog
					isOpen={true}
					loading={loading}
					error={error}
					people={people}
					onClose={handleCloseDialog}
				/>
			)}
		</article>
	);
};

export default Films;
