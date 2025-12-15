import { configureStore } from '@reduxjs/toolkit';
import ghibliApi from './services/ghibliApi';

export const store = configureStore({
	reducer: {
		[ghibliApi.reducerPath]: ghibliApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(ghibliApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
