import { useFilmsListQuery } from '../services/ghibliApi';
import type { Film } from '../types/ghibli';

function Films() {
	const { data, isLoading, isError, isUninitialized } =
		useFilmsListQuery(undefined);

	if (isLoading || isUninitialized) {
		return <p>Loading films...</p>;
	}

	if (isError) {
		return <p>Error loading films. Please try again later.</p>;
	}

	return (
		<article>
			<h1>Films</h1>
			<ul>
				{data.map((film: Film) => (
					<li key={film.id}>
						<h2>{film.title}</h2>
						<p>{film.description}</p>
						<p>Release Date: {film.release_date}</p>
					</li>
				))}
			</ul>
		</article>
	);
}
export default Films;
