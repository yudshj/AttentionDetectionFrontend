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
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';

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
            <Paper><Box p={3} m={5}>
                <h2>{props.name}</h2>
                <p>{url}</p>
                <DynamicChart data={data} name={props.name} color={props.color}/>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={() => { setWorking(!working); }}>开始/结束监控</Button>

                    <Button onClick={() => {
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
                </ButtonGroup>
            </Box></Paper>

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
                            <img id={"cam-" + props.uuid} alt={props.name + " Camara Picture"} src={"data:image/jpg;base64," + imgBase64} />
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