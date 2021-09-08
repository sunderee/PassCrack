import { PassCrackAttackTimeDetails } from "./passcrack.attack-time-details.int";

export interface PassCrackAttackTime {
    onlineThrottling: PassCrackAttackTimeDetails;
    onlineNoThrottling: PassCrackAttackTimeDetails;
    offlineSlowHashing: PassCrackAttackTimeDetails;
    offlineFastHashing: PassCrackAttackTimeDetails;
}

