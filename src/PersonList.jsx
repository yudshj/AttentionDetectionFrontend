import React from 'react';
import { Person } from './Person';
import { Box, Grid } from '@material-ui/core';

export const PersonList: React.FC = (props) => {
    return (
        <Box id="PersonList" p={3}>
            <Grid container spacing={2}>
                {props.items.entrySeq().map(([key, item]) => (
                    <Grid item xs={6} key={key}>
                        <Person baseline={props.baseline} theme={props.theme} uuid={key} name={item.name} ip={item.ip} port={item.port} color={item.color} deleteCallback={props.deleteCallback} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
