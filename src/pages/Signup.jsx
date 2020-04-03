import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from "@material-ui/core";
import links from "../constants/links";
import { auth } from '../services/authentication';
import { Copyright } from '../components'


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontWeight: 600,
        color: '#303F9F',
    },
    error: {
        marginTop: theme.spacing(6),
        paddingLeft: theme.spacing(1),
        color: '#eb2f06',
    },
    form: {
        width: '100%',
    },
    submit: {
        height: '3em',
        margin: theme.spacing(2, 0, 2),
    },
}));

const initAccount = {
    email: '',
    password: '',
    confirm: '',
}

export default () => {
    const classes = useStyles();
    const [account, setAccount] = useState(initAccount)
    const [error, setError] = useState('')
    const [login, setLogin] = useState(false)

    const handleChange = e => {
        // TODO: validation
        setAccount({ ...account, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (account.password !== account.confirm)
            setError('Password confirmation does not match')
        else {
            setError('')
            auth.signup(account)
                .then(
                    data => {
                        setLogin(true)
                    },
                    error => {
                        setError('Problem signing up')
                    }
                )
        }
    }

    return (
        login ?
            <Redirect to={links.appointments} />
            :
            <div className={classes.root}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h4" className={classes.title}>
                            Sanctuary Patient App
                    </Typography>

                        <Grid container className={classes.error}>
                            <Grid item xs>
                                {error}
                            </Grid>
                        </Grid>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirm"
                                label="Confirm Password"
                                type="password"
                                id="confirm"
                                autoComplete="confirm-password"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                        </Button>
                            <Link href="/login" variant="body2">
                                Already have an account? Log In
                        </Link>
                        </form>
                    </div>
                    <Box mt={6}>
                        <Copyright />
                    </Box>
                </Container>
            </div>
    );
}