import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const MOVIES_FEATURE_KEY = 'movies';

/*
 * Update these interfaces according to your requirements.
 */
export interface MoviesEntity {
  id: number;
}

export interface MoviesState extends EntityState<MoviesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const moviesAdapter = createEntityAdapter<MoviesEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchMovies())
 * }, [dispatch]);
 * ```
 */
export const fetchMovies = createAsyncThunk(
  'movies/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getMoviess()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialMoviesState: MoviesState = moviesAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const moviesSlice = createSlice({
  name: MOVIES_FEATURE_KEY,
  initialState: initialMoviesState,
  reducers: {
    add: moviesAdapter.addOne,
    remove: moviesAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state: MoviesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchMovies.fulfilled,
        (state: MoviesState, action: PayloadAction<MoviesEntity[]>) => {
          moviesAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchMovies.rejected, (state: MoviesState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const moviesReducer = moviesSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(moviesActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const moviesActions = moviesSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllMovies);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = moviesAdapter.getSelectors();

export const getMoviesState = (rootState: unknown): MoviesState =>
  rootState[MOVIES_FEATURE_KEY];

export const selectAllMovies = createSelector(getMoviesState, selectAll);

export const selectMoviesEntities = createSelector(
  getMoviesState,
  selectEntities
);
