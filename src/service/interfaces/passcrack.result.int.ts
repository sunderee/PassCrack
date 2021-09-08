import { PassCrackAttackTime } from "./passcrack.attack-time.int";
import { PassCrackFeedback } from "./passcrack.feedback.int";

export interface PassCrackResult {
    score: number;
    guesses: number;
    attackTime: PassCrackAttackTime;
    feedback: PassCrackFeedback;
}