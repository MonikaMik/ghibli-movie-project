import { useRef, useEffect } from 'react';
import PeopleList from './PeopleList';
import type { Person } from '../types/ghibli';
import styles from './PeopleDialog.module.css';

interface PeopleDialogProps {
	isOpen: boolean;
	loading: boolean;
	error: string | null;
	people: Person[];
	onClose: () => void;
}

export default function PeopleDialog({
	isOpen,
	loading,
	error,
	people,
	onClose
}: PeopleDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			className={styles.peopleDialog}
			onClick={e => {
				if (e.currentTarget === e.target) onClose();
			}}
		>
			<button
				onClick={onClose}
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
	);
}
