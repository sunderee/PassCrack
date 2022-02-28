import zxcvbn from 'zxcvbn';
import { PassCrackResult } from './interfaces/passcrack.result.int';

export class PassCrackService {
    private static instance: PassCrackService;

    public static getInstance(): PassCrackService {
        if (!PassCrackService.instance) {
            PassCrackService.instance = new PassCrackService();
        }
        return PassCrackService.instance;
    }

    private constructor() {
    // Do nothing
    }

    requestZxcvbnResult(password: string): PassCrackResult | null {
        if (password.length === 0) {
            return null;
        }
        const result = zxcvbn(password);
        return {
            score: result.score,
            guesses: result.guesses,
            attackTime: {
                onlineThrottling: {
                    display: result.crack_times_display.online_throttling_100_per_hour as string,
                    seconds: result.crack_times_seconds.online_throttling_100_per_hour as number
                },
                onlineNoThrottling: {
                    display: result.crack_times_display.online_no_throttling_10_per_second as string,
                    seconds: result.crack_times_seconds.online_no_throttling_10_per_second as number
                },
                offlineSlowHashing: {
                    display: result.crack_times_display.offline_slow_hashing_1e4_per_second as string,
                    seconds: result.crack_times_seconds.offline_slow_hashing_1e4_per_second as number
                },
                offlineFastHashing: {
                    display: result.crack_times_display.offline_fast_hashing_1e10_per_second as string,
                    seconds: result.crack_times_seconds.offline_fast_hashing_1e10_per_second as number
                }
            },
            feedback: {
                warning: result.feedback.warning,
                suggestions: result.feedback.suggestions
            }
        };
    }
}
