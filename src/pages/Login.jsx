import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Typography,
    Container
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import links from "../constants/links";
import { jwt } from '../services/authentication';
import AuthContext from '../contexts/AuthContext';

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
    error: {
        marginTop: theme.spacing(2),
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
    const { auth, setAuth } = useContext(AuthContext)

    const handleChange = e => {
        // TODO: validation
        setAccount({ ...account, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        jwt.login(account)
            .then(
                data => {
                    setAuth({ state: data.state })
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
        auth.state === 'login' ?
            <Redirect to={links.appointments} />
            :
            <div className={classes.root}>
                <Container component="main" maxWidth="xs" >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>

                        <Grid container className={classes.error}>
                            {error &&
                                <Grid item xs>
                                    {error}
                                </Grid>
                            }
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
                                autoFocus
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
                            {/* 
                            TODO: Password reset email
                            TODO: Enable signup page when SU and Access granting is ready

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
                            </Grid> */}
                        </form>
                    </div>
                </Container>
            </div>
    );
}