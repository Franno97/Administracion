

//export const { Chart } = require('chart.js');
//import { Chart } from './chart.loader';

import { FaceTecCustomization } from "src/assets/core-sdk/FaceTecSDK.js/FaceTecCustomization";

// Load custom sound files
/* const FACESCAN_SUCCESSFUL_SOUND_FILE = require("../Vocal_Guidance_Audio_Files/facescan_successful_sound_file.mp3").default; */
const FACESCAN_SUCCESSFUL_SOUND_FILE = "assets/Vocal_Guidance_Audio_Files/please_frame_your_face_sound_file.mp3";
const PLEASE_FRAME_YOUR_FACE_SOUND_FILE = "assets/Vocal_Guidance_Audio_Files/facescan_successful_sound_file.mp3";
const PLEASE_MOVE_CLOSER_SOUND_FILE = "assets/Vocal_Guidance_Audio_Files/please_move_closer_sound_file.mp3";
const PLEASE_PRESS_BUTTON_SOUND_FILE = "assets/Vocal_Guidance_Audio_Files/fplease_press_button_sound_file.mp3.mp3";
const PLEASE_RETRY_SOUND_FILE = "assets/Vocal_Guidance_Audio_Files/please_retry_sound_file.mp3";
const UPLOADING_SOUND_FILE = "assets/Vocal_Guidance_Audio_Files/uploading_sound_file.mp3";
/* const PLEASE_FRAME_YOUR_FACE_SOUND_FILE = require("../Vocal_Guidance_Audio_Files/please_frame_your_face_sound_file.mp3").default;
const PLEASE_MOVE_CLOSER_SOUND_FILE = require("../Vocal_Guidance_Audio_Files/please_move_closer_sound_file.mp3").default;
const PLEASE_PRESS_BUTTON_SOUND_FILE = require("../Vocal_Guidance_Audio_Files/please_press_button_sound_file.mp3").default;
const PLEASE_RETRY_SOUND_FILE = require("../Vocal_Guidance_Audio_Files/please_retry_sound_file.mp3").default;
const UPLOADING_SOUND_FILE = require("../Vocal_Guidance_Audio_Files/uploading_sound_file.mp3").default; */

export class SoundFileUtilities {

  // Return the customization object updated with custom sound files
  public setVocalGuidanceSoundFiles = (zoomCustomization: FaceTecCustomization) => {
    zoomCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile = PLEASE_FRAME_YOUR_FACE_SOUND_FILE;
    zoomCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile = PLEASE_MOVE_CLOSER_SOUND_FILE;
    zoomCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile = PLEASE_RETRY_SOUND_FILE;
    zoomCustomization.vocalGuidanceCustomization.uploadingSoundFile = UPLOADING_SOUND_FILE;
    zoomCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile = FACESCAN_SUCCESSFUL_SOUND_FILE;
    zoomCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile = PLEASE_PRESS_BUTTON_SOUND_FILE;
    return zoomCustomization;
  }
}
