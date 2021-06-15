import React, { useEffect, useState } from 'react';
import DynamicChart from './DynamicChart';
import $ from 'jquery';
import cloneDeep from 'lodash.clonedeep';
import { Button, ButtonGroup } from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PlayIcon from '@material-ui/icons/PlayArrow';

const TOTAL_POINT = 30;

export const Person: React.FC = function Person(props) {
    const [working, setWorking] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [imgBase64, setImgBase64] = useState("");
    const [count, setCount] = useState(0);
    const [data, setData] = useState({ y: [], x: [] })

    const url = `http://${props.ip}:${props.port}`;

    useEffect(() => {
        const fetchNewData = () => {
            $.getJSON(url + '/data').done((info) => {
                let newData = cloneDeep(data);

                // if (count === TOTAL_POINT) {
                //     newData.y.shift();
                // } else {
                //     newData.x.push(count);
                //     setCount(count + 1);
                // }
                // newData.y.push(info.value);

                if (newData.x.length === TOTAL_POINT) {
                    newData.x.shift();
                    newData.y.shift();
                }

                newData.x.push(count);
                newData.y.push(info.value);
                setCount(count + 1);
                setData(newData);
            }).fail((info) => {
                console.log("Fetching error:", info.readyState);
            });
        };

        let timer = null;
        if (working) {
            if (timer === null) timer = setInterval(fetchNewData, 1000);
        } else if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
        return () => { if (timer !== null) clearInterval(timer); }
    }, [url, working, count, data])

    const handleClose = () => setShowCamera(false);

    return (
        <div>
            <Card elevation={2} variant>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center" >
                <Grid item><h2>{props.name}</h2></Grid>
                <Grid item><ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button startIcon={<PlayIcon/>} onClick={() => { setWorking(!working); }}>开始/结束监控</Button>

                    <Button startIcon={<CameraIcon/>} onClick={() => {
                        $.getJSON(url + '/camera')
                            .done((data) => {
                                setImgBase64(data.value);
                                setShowCamera(true);
                            })
                            .fail((data) => {
                                setShowCamera(false);
                                console.log("Camera fetch failed:" + data.readyState);
                            });
                    }}>打开摄像头</Button>

                    <Button startIcon={<DeleteIcon />} onClick={()=>{props.deleteCallback(props.uuid)}} color="secondary">删除</Button>
                </ButtonGroup>
                </Grid>
            </Grid>

            {/* <Grid item> */}
                <DynamicChart baseline={props.baseline} data={data} name={props.name} color={props.color} theme={props.theme}/>
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