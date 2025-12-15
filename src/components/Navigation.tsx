import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
	return (
		<nav className={styles.navigation}>
			<ul>
				<li>
					<NavLink
						to='/'
						className={({ isActive }) =>
							`${styles.navLink} ${isActive ? styles.active : ''}`
						}
					>
						About
						<span className='material-symbols-outlined'>arrow_forward</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/films'
						className={({ isActive }) =>
							`${styles.navLink} ${isActive ? styles.active : ''}`
						}
					>
						Films
						<span className='material-symbols-outlined'>arrow_forward</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
