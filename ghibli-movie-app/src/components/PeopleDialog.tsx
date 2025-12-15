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
			const scrollY = window.scrollY;
			dialogRef.current?.showModal();
			window.scrollTo(0, scrollY);
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
			aria-labelledby='dialog-title'
			aria-modal='true'
		>
			<button
				onClick={onClose}
				className={styles.closeButton}
				aria-label='Close dialog'
			>
				✕
			</button>

			{loading ? (
				<p
					role='status'
					aria-live='polite'
				>
					Loading people...
				</p>
			) : error ? (
				<p role='alert'>{error}</p>
			) : people.length > 0 ? (
				<PeopleList people={people} />
			) : (
				<p>No people to display</p>
			)}
		</dialog>
	);
}
