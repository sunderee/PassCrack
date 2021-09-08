import React from 'react';
import { PassCrackResult } from "./service/interfaces/passcrack.result.int";

// UI & Styles
import { Card, createTheme, Grid, ThemeProvider } from '@material-ui/core';
import { InputComponent } from './components/input.component';
import { PasswordStrengthDisplayComponent } from './components/password-strength-display.component';
import './styles/main.scss';

interface AppState {
    result?: PassCrackResult;
}

export class App extends React.Component<unknown, AppState> {
    private applicationTheme = createTheme({
        palette: {
            primary: {
                main: '#395C6B',
                contrastText: '#FAFAFA'
            },
            secondary: {
                main: '#54889e',
                contrastText: '#FAFAFA'
            }
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        }
    });

    constructor(props: unknown) {
        super(props);
        this.state = { result: undefined };
    }

    override render(): JSX.Element {
        return <ThemeProvider theme={this.applicationTheme} >
            <Grid className="container" container={true} alignItems="center" justifyContent="center">
                <Grid item={true}>
                    <Card className="card-container" elevation={0}>
                        <Grid container={true} direction="column" alignItems="flex-start" justifyContent="flex-start">
                            <InputComponent onResultCallback={(result: PassCrackResult) => this.setState({ ...this.state, result: result })} clearResults={() => this.setState({ ...this.state, result: undefined })} />
                            <PasswordStrengthDisplayComponent score={this.state.result?.score ?? 0} guesses={this.state.result?.guesses ?? 0} attackTime={this.state.result?.attackTime} warning={this.state.result?.feedback.warning} suggestions={this.state.result?.feedback.suggestions} />
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </ThemeProvider>
    }
}