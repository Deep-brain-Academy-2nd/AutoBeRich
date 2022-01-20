import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const RegisterMain = styled.div`
  color: #fff;
  height: 88%;
  size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('/images/background.png');
`;
const RegisterPresenter = ({ handleSubmit }) => {
  const theme = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 25,
    },
  });
  // useEffect(() => {
  //   // redirect to home if user is authenticated
  //   if (user) Router.replace('/');
  // }, [user]);
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <RegisterMain>
        <ThemeProvider theme={theme}>
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
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoComplete="name"
                      InputProps={{
                        style: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      type="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      InputProps={{
                        style: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      type="password"
                      name="password"
                      label="Password"
                      autoComplete="new-password"
                      InputProps={{
                        style: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="secretKey"
                      type="password"
                      name="secretKey"
                      label="secretKey"
                      autoComplete="new-secretKey"
                      InputProps={{
                        style: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="accessKey"
                      type="password"
                      name="accessKey"
                      label="accessKey"
                      autoComplete="new-accessKey"
                      InputProps={{
                        style: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login">Already have an account? Sign in</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </RegisterMain>
    </>
  );
};

export default RegisterPresenter;
