import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    TextField,
    Link,
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
    password: '',
    confirm: '',
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
        if (account.password !== account.confirm)
            setError('Password confirmation does not match')
        else {
            setError('')
            jwt.signup(account)
                .then(
                    data => {
                        setAuth({ state: data.state })
                    },
                    error => {
                        setError('Problem signing up')
                    }
                )
        }
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
                            Sign up
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
                </Container>
            </div>
    );
}