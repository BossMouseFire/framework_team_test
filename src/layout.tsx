import React, { useEffect, useState } from 'react';
import {
  TextField, Button, ThemeProvider, createTheme, makeStyles, Container, Paper,
} from '@material-ui/core';
import {
  green,
} from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import {
  fetchItem, addItem,
} from './store/actionCreators/item';
import useTypeSelector from './hooks/useTypeSelector';
import ItemsList from './components/list';

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50vw',
    padding: '20px 8px',
    margin: 'auto',
    marginTop: '10vw',
  },
  containerInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputData: {
    width: '75%',
  },
  buttonAdd: {
    width: '20%',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editItem: {
    width: '80%',
  },
});

const Layout:React.FC = () => {
  const { items } = useTypeSelector((state) => state.item);
  const [about, setAbout] = useState<string>('');
  const [errorState, setErrorState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const styles = useStyles();
  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);
  const aboutTaskChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAbout(event.target.value);
  };
  const addItemButton = async (
    event: React.MouseEvent<HTMLAnchorElement> |
      React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (about.length === 0) {
      setErrorState(true);
    } else {
      setErrorState(false);
      const idItem = items.length !== 0 ? items[items.length - 1].id + 1 : 1;
      await dispatch(addItem(idItem, about, items));
    }
  };
  return (
    <Paper className={styles.paper}>
      <Container className={styles.containerInput}>
        <TextField
          error={errorState}
          id="outlined-required"
          label={errorState ? '???????????? ????????????' : 'Task'}
          variant="outlined"
          className={styles.inputData}
          onChange={(e) => aboutTaskChange(e)}
        />
        <ThemeProvider theme={theme}>
          <Button variant="outlined" color="primary" className={styles.buttonAdd} onClick={(e) => addItemButton(e)}>
            ADD
          </Button>
        </ThemeProvider>
      </Container>
      <ItemsList items={items} />
    </Paper>
  );
};
export default Layout;
