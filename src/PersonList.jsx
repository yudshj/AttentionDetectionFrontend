import React from 'react';
import { Person } from './Person';
import { Box, Grid } from '@material-ui/core';

export const PersonList: React.FC = (props) => {
    return (
        <Box id="PersonList" p={3}>
            <Grid container spacing={2}>
                {props.items.entrySeq().map(([key,value]) => (
                    <Grid item xs={12} md={6} key={key}>
                        <Person
                            baseline={props.baseline}
                            uuid={key}
                            name={value.name}
                            ip={value.ip}
                            port={value.port}
                            color={value.color}
                            deleteCallback={props.deleteCallback}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PersonList;