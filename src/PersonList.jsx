import React from 'react';
import { Person } from './Person';
import { Box, Grid } from '@material-ui/core';

export class PersonList extends React.Component {
    render() {
        return (
            <Box id="PersonList">
                <Grid container spacing={2}>
                {this.props.items.map(item => (
                    <Grid item xs={6}>
                    <Person key={item.uuid} uuid={item.uuid} name={item.name} ip={item.ip} port={item.port} color={item.color}/>
                    </Grid>
                ))}
                </Grid>
            </Box>
        );
    }
}
