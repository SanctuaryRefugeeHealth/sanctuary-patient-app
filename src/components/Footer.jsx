import React from 'react'
import { Container, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright'


const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(16),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
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