import React, {useState} from 'react';
import {PersonList} from "./PersonList";
import {v4} from "uuid";
import {Fab, Box, Container, TextField, Button, makeStyles, Grid, Zoom} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { MaterialPicker } from 'react-color';
import { OrderedMap } from 'immutable';

function randomRGB() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        backgroundColor: "grey.300",
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
        color: 'grey',
        fontSize: 20
    }
}));

const App: React.FC = (props) => {
    const [inputs, setInputs] = useState({
        name: "Yudong",
        ip: "127.0.0.1",
        port: 5000
    })
    const [items, setItems] = useState(OrderedMap());
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#000")

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
        setColor(randomRGB());
    }

    const deleteItem = (uuid) => {
        console.log("delete:", uuid)
        setItems(items.delete(uuid));
    }

    const handleInputChange = ({target: {name, value}}) => {
        setInputs(ipt => ({...ipt, [name]: value}))
    }
    // const handleInputChange = (data) => {console.log(data)}

    return (
        <div className={classes.root}>
            {items.size === 0 ?

                <div className={classes.bigGreyCaption}>
                    <h1>请点击右下方的按钮添加后端</h1>
                </div> :
                <Container>
                    <PersonList items={items} deleteCallback={deleteItem}/>
                </Container>
            }
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <AddIcon/>
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">监控后端信息</DialogTitle>
                <DialogContent>
                    <TextField label="Name:" type="text" name="name" key="name" onChange={handleInputChange}
                               value={inputs.name}/>
                    <TextField label="IP:" type="text" name="ip" key="ip" onChange={handleInputChange}
                               value={inputs.ip}/>
                    <TextField label="Port:" type="number" name="port" key="port" onChange={handleInputChange}
                               value={inputs.port}/>
                    <p>{inputs.name} @ {inputs.ip}:{inputs.port}</p>
                    <MaterialPicker color={color} onChangeComplete={(x)=>setColor(x.hex)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default App;
