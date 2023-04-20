// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Button from '@mui/material/Button';
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <>
      <NxWelcome title="wookie-movie" />
      <Button variant="contained">Hello World</Button>
      <div />
    </>
  );
}

export default App;
