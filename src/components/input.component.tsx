import React from 'react';
import { PassCrackService } from '../service/passcrack.service';
import { PassCrackResult } from '../service/interfaces/passcrack.result.int';

// UI & Styles
import { Grid, TextField, Typography } from '@material-ui/core';
import '../styles/main.scss';

type EventType = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

interface InputComponentProps {
  onResultCallback(result: PassCrackResult): void;
  clearResults(): void;
}

export class InputComponent extends React.Component<InputComponentProps> {
  private service = PassCrackService.getInstance();

  override render(): JSX.Element {
      return (
          <div>
              <Grid item={true}>
                  <Typography className="text" variant="h5">
            PassCrack - Password Strength Calculator
                  </Typography>
              </Grid>
              <Grid item={true}>
                  <Typography className="text" variant="overline">
            Simple password strength calculator
                  </Typography>
              </Grid>

              <Grid className="input-field-padding" item={true}>
                  <TextField
                      variant="standard"
                      fullWidth={true}
                      label="Type in your password"
                      type="password"
                      onChange={(event: EventType) => {
                          if (event.target.value.length === 0) {
                              this.props.clearResults();
                          }

                          const result = this.service.requestZxcvbnResult(event.target.value);
                          if (result != null) {
                              this.props.onResultCallback(result);
                          }
                      }}
                  />
              </Grid>
          </div>
      );
  }
}
