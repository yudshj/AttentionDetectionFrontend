import React  from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BlockPicker } from 'react-color';
import {TextField, Button, Grid, Switch, FormControlLabel} from "@material-ui/core";
import { Refresh } from '@material-ui/icons';

export const AddDialog: React.FC = (props) => {
    function handleKeyPress(event) {
        if (event.code === "Enter" && props.open) {
            props.handleSubmit();
        }
    }

    return (
        <Dialog fullWidth={false} maxWidth={false} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" onKeyPress={handleKeyPress}>
            <DialogTitle id="form-dialog-title">监控后端信息</DialogTitle>
            <DialogContent>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                            <Grid item>
                                <TextField label="Name:" type="text" name="name" key="name" onChange={props.handleInputChange} value={props.inputs.name} />
                            </Grid>
                            <Grid item><TextField label="IP:" type="text" name="ip" key="ip" onChange={props.handleInputChange}
                                value={props.inputs.ip} /></Grid>
                            <Grid item><TextField label="Port:" type="number" name="port" key="port" onChange={props.handleInputChange}
                                value={props.inputs.port} /></Grid>
                            <Grid item>
                                <FormControlLabel
                                    label="使用 https"
                                    control={<Switch color='primary' checked={props.inputs.useHttps} onChange={props.handleSwitchChange} name="useHttps"/>}
                                />
                            </Grid>
                            <Grid item>
                                <Button endIcon={<Refresh />} variant="outlined" color='default' onClick={props.handleGenNameClick}>随机名字</Button>
                            </Grid>
                            <Grid item>
                                <Button endIcon={<Refresh />} variant="outlined" color='default' onClick={props.handleGenColorClick}>随机颜色</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={2} alignItems="center" justify="center">
                            <Grid item>
                                <p style={{
                                    textAlign: 'center',
                                    fontSize: 'large',
                                    fontWeight: 'bold',
                                    color: props.color,
                                }}>
                                    {props.inputs.name} @ {props.inputs.useHttps ? "https://" : "http://"}{props.inputs.ip}:{props.inputs.port}
                                </p>
                            </Grid>
                            <Grid item><BlockPicker color={props.color} onChangeComplete={(x) => props.setColor(x.hex)} /></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary" variant="text">
                    取消
                </Button>
                <Button onClick={props.handleSubmit} color="primary" variant="contained">
                    确认
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDialog;