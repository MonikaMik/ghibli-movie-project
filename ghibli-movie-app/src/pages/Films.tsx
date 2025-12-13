import { useGetFilmsQuery } from '../services/ghibliApi';
import { useFilmPeople } from '../hooks/useFilmPeople';
import PeopleTable from '../components/PeopleTable';
import FilmCard from '../components/FilmCard';
import styles from './Films.module.css';

const Films = () => {
	const { data: films, isLoading, error: filmsError } = useGetFilmsQuery();
	const { people, activeFilmId, loading, error, fetchPeople } = useFilmPeople();

	if (isLoading) return <p>Loading films...</p>;
	if (filmsError) return <p>Error loading films</p>;

	return (
		<article>
			<h1>Films</h1>

			<ul className={styles.filmList}>
				{films?.map(film => (
					<li key={film.id}>
						<FilmCard film={film} />
						<button onClick={() => fetchPeople(film)}>Show people</button>
						{activeFilmId === film.id && loading && <p>Loading people...</p>}
					</li>
				))}
			</ul>

			{activeFilmId && !loading && (
				<section aria-label='People in selected film'>
					{error ? (
						<p>{error}</p>
					) : people.length > 0 ? (
						<PeopleTable people={people} />
					) : (
						<p>No people to display</p>
					)}
				</section>
			)}
		</article>
	);
};

export default Films;
