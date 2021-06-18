import React, {useEffect, useRef, useState} from 'react';
import DynamicChart from './DynamicChart';
import {Button, ButtonGroup, Hidden} from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PauseIcon from "@material-ui/icons/PauseSharp";
import PlayIcon from '@material-ui/icons/PlayArrow';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const TOTAL_POINT = 30;

export const Person: React.FC = function Person(props) {
    const [working, setWorking] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [imgBase64, setImgBase64] = useState("");
    const [data, setData] = useState({ num: 0, y: [], x: [] })

    const timeId = useRef(null);

    const baseurl = `http://${props.ip}:${props.port}`;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        function fetchNewData() {
            fetch(baseurl + '/data')
                .then(function (response) {
                    return response.json();
                })
                .then(function (info) {
                    let newData = {
                        num: data.num + 1,
                        x: data.x.concat(new Date().toLocaleTimeString()),
                        y: data.y.concat(info.value)
                    };

                    if (newData.num > TOTAL_POINT) {
                        newData.x.shift();
                        newData.y.shift();
                    }

                    setData(newData);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        if (working) {
            timeId.current = setInterval(fetchNewData, 1000);
        } else {
            clearInterval(timeId.current);
        }

        return () => { clearInterval(timeId.current); }
    }, [baseurl, working, data]);

    const handleClose = () => setShowCamera(false);

    function handleCameraClick() {
        fetch(baseurl + '/camera')
            .then(function(response) {
                return response.json()
            })
            .then(function(info) {
                setShowCamera(true);
                setImgBase64(info.value);
            })
            .catch(function(error) {
                setShowCamera(false);
                console.log("Camera fetch failed:" + error);
            })
    }

    return (
        <div>
            <Card elevation={2} variant>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center" >
                <Grid item><h2>{props.name}</h2></Grid>
                <Grid item><ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button startIcon={working ? <PauseIcon/> : <PlayIcon/>} onClick={() => { setWorking(!working); }}><Hidden xsDown>开始/结束监控</Hidden></Button>

                    <Button startIcon={<CameraIcon/>} onClick={handleCameraClick}><Hidden xsDown>打开摄像头</Hidden></Button>

                    <Button startIcon={<DeleteIcon />} onClick={()=>{props.deleteCallback(props.uuid)}} color="secondary"><Hidden xsDown>删除</Hidden></Button>
                </ButtonGroup>
                </Grid>
            </Grid>

            {/* <Grid item> */}
                <DynamicChart baseline={props.baseline} data={data} name={props.name} color={props.color} theme={prefersDarkMode ? 'dark' : 'light'}/>
                {/* </Grid> */}
            </Card>

            <Dialog
                open={showCamera}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.name + "的摄像头"}</DialogTitle>
                <DialogContent>
                    {
                        imgBase64 === "" ?
                            <DialogContentText>
                                未检测到人脸。
                            </DialogContentText> :
                            <img id={"camera"} alt={props.name + " Camara Picture"} src={"data:image/jpg;base64," + imgBase64} />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Person;