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

const LoginMain = styled.div`
	color: #fff;
	height: 88%;
	size: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-image: url('/images/background.png');
`;

function LoginPresenter({ handleSubmit }: { handleSubmit: Function }) {
	const theme = createTheme({
		typography: {
			// In Chinese and Japanese the characters are usually larger,
			// so a smaller fontsize may be appropriate.
			fontSize: 25,
		},
	});
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<LoginMain>
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
								Sign in
							</Typography>
							<Box component="form" onSubmit={() => handleSubmit} noValidate sx={{ mt: 1 }}>
								<TextField
									id="email"
									name="email"
									type="email"
									margin="normal"
									placeholder="email"
									required
									fullWidth
									label="Email Address"
									autoComplete="email"
									autoFocus
									InputProps={{
										style: {
											backgroundColor: 'white',
										},
									}}
								/>
								<TextField
									id="password"
									name="password"
									type="password"
									margin="normal"
									placeholder="password"
									required
									fullWidth
									label="Password"
									autoComplete="current-password"
									InputProps={{
										style: {
											backgroundColor: 'white',
										},
									}}
								/>
								<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
									Sign In
								</Button>
								<Grid container>
									<Grid item>
										<Link href="/register">{"Don't have an account? Sign Up"}</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
			</LoginMain>
		</>
	);
}

export default LoginPresenter;
