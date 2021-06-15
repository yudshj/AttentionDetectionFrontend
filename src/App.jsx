import React, { useState } from 'react';
import { PersonList } from "./PersonList";
import { v4 } from "uuid";
import { Fab, Container, TextField, Button, makeStyles, Box, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BlockPicker } from 'react-color';
import { OrderedMap } from 'immutable';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import { Refresh } from '@material-ui/icons';
import randomColor from 'randomcolor';

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
    item: {
        flex: 1
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
    bigGreyCaption: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: 'center',
        verticalAlign: 'center',
        width: '100vw',
        height: '100vh',
    },
    summary: {
        textAlign: 'center',
        fontSize: 'large',
        fontWeight: 'bold'
    }
}));

const App: React.FC = (props) => {
    const [inputs, setInputs] = useState({
        name: "",
        ip: "127.0.0.1",
        port: 5000
    })
    const [items, setItems] = useState(OrderedMap());
    const [open, setOpen] = useState(false);
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
    // const handleInputChange = (data) => {console.log(data)}

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                {items.size === 0 ?

                    <div className={classes.bigGreyCaption}>
                        <Box color="text.secondary" fontSize="h2.fontSize">请点击右下方的按钮添加后端</Box>
                    </div> :
                    <Container>
                        <PersonList items={items} deleteCallback={deleteItem} theme={prefersDarkMode ? 'dark' : 'light'} baseline={baseline}/>
                    </Container>
                }
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                    <AddIcon />
                </Fab>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">监控后端信息</DialogTitle>
                    <DialogContent>
                        <Grid container direction="row" spacing={2}>
                            <Grid item>
                                <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                                    <Grid item>
                                        <TextField label="Name:" type="text" name="name" key="name" onChange={handleInputChange} value={inputs.name} />
                                    </Grid>
                                    <Grid item><TextField label="IP:" type="text" name="ip" key="ip" onChange={handleInputChange}
                                        value={inputs.ip} /></Grid>
                                    <Grid item><TextField label="Port:" type="number" name="port" key="port" onChange={handleInputChange}
                                        value={inputs.port} /></Grid>
                                    <Grid item>
                                        <Button endIcon={<Refresh />} variant="outlined" color='default' onClick={handleGenNameClick}>随机名字</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button endIcon={<Refresh />} variant="outlined" color='default' onClick={handleGenColorClick}>随机颜色</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                                    <Grid item><p className={classes.summary} style={{ color: color }}>{inputs.name} @ {inputs.ip}:{inputs.port}</p></Grid>
                                    <Grid item><BlockPicker width={300} color={color} onChangeComplete={(x) => setColor(x.hex)} /></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" variant="text">
                            取消
                        </Button>
                        <Button onClick={handleSubmit} color="primary" variant="contained">
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}

export default App;
