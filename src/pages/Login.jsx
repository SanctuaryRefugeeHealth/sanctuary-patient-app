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

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://sanctuaryrefugee.ca/">
                Sanctuary Refugee Health Centre
            </Link>
            {' 2020'}
        </Typography>
    );
}

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
    password: ''
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
        auth.login(account)
            .then(
                data => {
                    setLogin(true)
                },
                status => {
                    switch (status) {
                        case 401:
                            setError('Incorrect email or password')
                            break;
                        default:
                            setError('Problem logging in')
                            break;
                    }
                }
            )
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Log In
                        </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={6}>
                        <Copyright />
                    </Box>
                </Container>
            </div>
    );
}