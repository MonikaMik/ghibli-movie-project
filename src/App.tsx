import About from './pages/About';
import Films from './pages/Films';
import Aside from './components/Aside';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';

function App() {
	return (
		<BrowserRouter>
			<div className={styles.appContainer}>
				<Aside />
				<main className={styles.main}>
					<Routes>
						<Route
							path='/'
							element={<About />}
						/>
						<Route
							path='/films'
							element={<Films />}
						/>
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
