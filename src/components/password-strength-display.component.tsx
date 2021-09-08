import React from 'react';
import { PassCrackAttackTime } from '../service/interfaces/passcrack.attack-time.int';

// UI & Styles
import { Grid, Typography } from '@material-ui/core';
import '../styles/main.scss';

interface PasswordStrengthStyle {
  title: string;
  color: string;
}

interface PasswordStrengthDisplayComponentProps {
  score: number;
  guesses: number;
  attackTime?: PassCrackAttackTime;
  warning?: string;
  suggestions?: string[];
}

export class PasswordStrengthDisplayComponent extends React.Component<PasswordStrengthDisplayComponentProps> {
  private readonly passwordStrengthStyles: PasswordStrengthStyle[] = [
      { title: 'extremely weak', color: '#E5625E' },
      { title: 'weak', color: '#F79D84' },
      { title: 'medium', color: '#FAC05E' },
      { title: 'good', color: '#BBC2E2' },
      { title: 'strong', color: '#99D19C' }
  ];

  override render(): JSX.Element {
      return (
          <div className="password-strength-container">
              <Grid item={true}>
                  <Typography variant="body1">
            Your password strength:{' '}
                      <span style={{ color: this.passwordStrengthStyles[this.props.score]?.color }}>
                          {this.passwordStrengthStyles[this.props.score]?.title}
                      </span>
                  </Typography>
                  <Typography variant="body2">{this.props.warning}</Typography>
                  {this.props.suggestions?.length !== 0 ? (
                      this.props.suggestions?.map((suggestion: string, index: number) => (
                          <div key={index}>
                              <Typography variant="caption">{suggestion}</Typography>
                              <br />
                          </div>
                      ))
                  ) : (
                      <span></span>
                  )}
              </Grid>

              <Grid className="inner-container" item={true}>
                  <Typography>
            Guesses needed to break the password:{' '}
                      <span className="guesses-count">{this.props.guesses}</span>
                  </Typography>
                  {this.props.attackTime !== undefined ? (
                      <div>
                          <Typography variant="caption">
                Online attack on a service that rate limits password auth attempts:{' '}
                              {this.props.attackTime?.onlineThrottling.display} (
                              {this.props.attackTime?.onlineThrottling.seconds} seconds)
                          </Typography>
                          <br />
                          <Typography variant="caption">
                Online attack on a service that doesn&#39;t rate limit password auth attempts:{' '}
                              {this.props.attackTime?.onlineNoThrottling.display} (
                              {this.props.attackTime?.onlineNoThrottling.seconds} seconds)
                          </Typography>
                          <br />
                          <Typography variant="caption">
                Offline attack with fast hash functions, wide range of guesses per second:{' '}
                              {this.props.attackTime?.offlineFastHashing.display} (
                              {this.props.attackTime?.offlineFastHashing.seconds} seconds)
                          </Typography>
                          <br />
                          <Typography variant="caption">
                Offline attack with slow hash functions and moderate work factor:{' '}
                              {this.props.attackTime?.offlineSlowHashing.display} (
                              {this.props.attackTime?.offlineSlowHashing.seconds} seconds)
                          </Typography>
                      </div>
                  ) : (
                      <span></span>
                  )}
              </Grid>
          </div>
      );
  }
}
