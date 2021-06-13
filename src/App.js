import React, { useState } from 'react';
import { PersonList } from "./PersonList";
import { v4 } from "uuid";
import { Box, Container, TextField, Button, makeStyles, Grid } from "@material-ui/core";

function randomRGB() {
    let o = Math.floor, r = Math.random, s = 255.99;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        backgroundColor: "grey.300"
    },
    p: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    item: {
        flex: 1
    }
}));

const App: React.FC = (props) => {
    const [inputs, setInputs] = useState({
        name: "Yudong",
        ip: "127.0.0.1",
        port: 5000
    })
    const [items, setItems] = useState([]);

    const classes = useStyles();

    function handleSubmit(e) {
        const newPersonItem = {
            name: inputs.name,
            ip: inputs.ip,
            port: inputs.port,
            uuid: v4(),
            color: randomRGB()
        };
        setItems(items.concat(newPersonItem));
    }

    const handleInputChange = ({ target: { name, value } }) => { setInputs(ipt => ({ ...ipt, [name]: value })) }
    // const handleInputChange = (data) => {console.log(data)}

    return (
        <div className={classes.root}>
            <Container>
                <Box m={1} display="flex" alignItems="center" justifyContent="center">
                    <Grid container spacing={3}>
                        <Grid item xs={4} className={classes.item}>
                            <TextField label="Name:" type="text" name="name" key="name" onChange={handleInputChange} value={inputs.name} />
                        </Grid>
                        <Grid item xs={4} className={classes.item}>
                            <TextField label="IP:" type="text" name="ip" key="ip" onChange={handleInputChange} value={inputs.ip} />
                        </Grid>
                        <Grid item xs={4} className={classes.item}>
                            <TextField label="Port:" type="number" name="port" key="port" onChange={handleInputChange} value={inputs.port} />
                        </Grid>
                        <Grid item xs={6} className={classes.item}>
                            <p>{inputs.name} @ {inputs.ip}:{inputs.port}</p>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" id="add-ip-port-btn" onClick={handleSubmit}>Add</Button>
                        </Grid>
                    </Grid>
                </Box>
                <PersonList items={items} />
            </Container>
        </div>
    );
}

export default App;
