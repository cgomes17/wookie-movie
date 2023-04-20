import { Route, Link } from 'react-router-dom';

import styles from './movies-list.module.scss';

/* eslint-disable-next-line */
export interface MoviesListProps {}

export function MoviesList(props: MoviesListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MoviesList!</h1>

      <ul>
        <li>
          <Link to="/">movies-list root</Link>
        </li>
      </ul>
      <Route
        path="/"
        element={<div>This is the movies-list root route.</div>}
      />
    </div>
  );
}

export default MoviesList;
