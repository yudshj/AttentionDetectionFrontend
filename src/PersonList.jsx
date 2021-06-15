import React from 'react';
import { Person } from './Person';
import { Box, Grid } from '@material-ui/core';

export const PersonList: React.FC = (props) => {
    return (
        <Box id="PersonList" p={3}>
            <Grid container spacing={2}>
                {props.items.map((item) => (
                    <Grid item xs={12} md={6} key={item.key}>
                        <Person baseline={props.baseline} uuid={item.key} name={item.name} ip={item.ip} port={item.port} color={item.color} deleteCallback={props.deleteCallback} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PersonList;