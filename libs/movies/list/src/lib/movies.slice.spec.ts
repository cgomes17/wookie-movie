import { fetchMovies, moviesAdapter, moviesReducer } from './movies.slice';

describe('movies reducer', () => {
  it('should handle initial state', () => {
    const expected = moviesAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(moviesReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchMoviess', () => {
    let state = moviesReducer(undefined, fetchMovies.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = moviesReducer(
      state,
      fetchMovies.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = moviesReducer(
      state,
      fetchMovies.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
