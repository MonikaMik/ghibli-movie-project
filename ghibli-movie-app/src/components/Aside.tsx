import { Link } from 'react-router-dom';
import styles from './Aside.module.css';

export default function Aside() {
	return (
		<aside>
			<nav>
				<ul>
					<li>
						<Link
							className={`${styles.navLink}`}
							to='/'
						>
							About
						</Link>
					</li>
					<li>
						<Link
							className={`${styles.navLink}`}
							to='/films'
						>
							Films
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
