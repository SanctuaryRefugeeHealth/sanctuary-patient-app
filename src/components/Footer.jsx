import React from 'react'
import { Container, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright'


const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(6),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default () => {
    const classes = useStyles()
    return (
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Box>
                <Copyright />
            </Box>
        </Container>
    )
}