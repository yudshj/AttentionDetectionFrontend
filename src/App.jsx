import React, { useState } from 'react';
import PersonList from "./PersonList";
import Fab from "@material-ui/core/Fab";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from "@material-ui/core/CssBaseline";
import randomColor from 'randomcolor';
import AddDialog from './AddDialog';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core";
import { Close } from '@material-ui/icons';

import { v4 } from "uuid";
import { OrderedMap } from 'immutable';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

const genConfig = {
    dictionaries: [adjectives, animals],
    style: 'capital',
    separator: ' '
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    fabGroup: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App: React.FC = (props) => {
    const [inputs, setInputs] = useState({
        name: "",
        ip: "127.0.0.1",
        port: 5000
    })
    const [items, setItems] = useState(OrderedMap());
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [baseline, setBaseline] = useState(0.15);
    const [color, setColor] = useState("#000")
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const classes = useStyles();

    function handleSubmit() {
        const uuid = v4();
        console.log(uuid);
        const newPersonItem = {
            name: inputs.name,
            ip: inputs.ip,
            port: inputs.port,
            color
        };
        setItems(items.set(uuid, newPersonItem));
        setOpen(false);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
        setInputs({
            name: uniqueNamesGenerator(genConfig),
            ip: "127.0.0.1",
            port: 5000
        })
        setColor(randomColor());
    }

    function handleGenNameClick() {
        setInputs({ ...inputs, name: uniqueNamesGenerator(genConfig) })
    }

    function handleGenColorClick() {
        setColor(randomColor());
    }

    const deleteItem = (uuid) => {
        console.log("delete:", uuid)
        setItems(items.delete(uuid));
    }

    const handleInputChange = ({ target: { name, value } }) => {
        setInputs(ipt => ({ ...ipt, [name]: value }))
    }

    function handleUp() {
        setOpenSnackbar(true);
        setBaseline(baseline + 0.05)
    }

    function handleDown() {
        setOpenSnackbar(true);
        setBaseline(baseline - 0.05)
    }

    function handleSnackbarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                {items.size === 0 ?

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: 'center',
                        verticalAlign: 'center',
                        width: '100vw',
                        height: '100vh',
                    }}>
                        <Box color="text.secondary" fontSize="h2.fontSize">请点击右下方的按钮“+”添加后端</Box>
                    </div> :
                    <Container>
                        <PersonList items={items} deleteCallback={deleteItem} theme={prefersDarkMode ? 'dark' : 'light'} baseline={baseline} />
                    </Container>
                }

                <div className={classes.fabGroup}>
                    <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                        <Grid item><Fab color="secondary" aria-label="up" onClick={handleUp}>
                            <KeyboardArrowUpIcon />
                        </Fab></Grid>
                        <Grid item><Fab color="secondary" aria-label="down" onClick={handleDown}>
                            <KeyboardArrowDownIcon />
                        </Fab></Grid>
                        <Grid item><Fab color="primary" aria-label="add" onClick={handleOpen}>
                            <AddIcon />
                        </Fab></Grid>
                    </Grid>
                </div>

                <AddDialog
                    color={color}
                    handleClose={handleClose}
                    handleGenColorClick={handleGenColorClick}
                    handleGenNameClick={handleGenNameClick}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    inputs={inputs}
                    open={open}
                    setColor={setColor}
                ></AddDialog>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    message={"New baseline is: " + baseline.toString()}
                    open={openSnackbar}
                    // autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert onClose={handleSnackbarClose} severity="info">
                        {"New baseline is: " + baseline.toFixed(2)}
                    </Alert>
                </Snackbar>
            </div>
        </ThemeProvider>
    );
}

export default App;
