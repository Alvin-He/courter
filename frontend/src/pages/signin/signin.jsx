/**
 *  Code Referenced from: https://github.com/mui/material-ui/blob/v5.9.1/docs/data/material/getting-started/templates/sign-in/SignIn.js
 *  Commit: 40be8b4 
 *  
 *  Licensed Under MIT License. See License.txt in the home repo for more information.
 * 
 */



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import api from '../../modules/sw';
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Courter
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const [alert, setAlert] = React.useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await api({
            type: 'auth',
            username: data.get('username'),
            password: data.get('password'),
        });
        console.log(res);
        if (res.success) return window.location.href = '/';
        setAlert(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Collapse in={alert}>
                <Alert 
                    severity='error'
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setAlert(false)}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    }
                >
                    Invalid Username or Password
                </Alert>
            </Collapse>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Courter Admin Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Typography variant='overline' color='GrayText'>
                            If you forgot your password, please update on the server.
                        </Typography>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}