/**
 * 
 * tutorial : https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries
 *            https://cloud.google.com/text-to-speech/
 * 
 * Chandresh Luhar
 * 
 * Set the env variable in powershell before running the code
 * $env:GOOGLE_APPLICATION_CREDENTIALS="D:\\GCPprojects\\mytexttospeech-6c5ceb5d67ae.json"
 * 
 */


const fs = require('fs');
const util = require('util');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();
// randomize the available german voices
const voiceNames = ['de-DE-Wavenet-A', 'de-DE-Wavenet-B', 'de-DE-Wavenet-C', 'de-DE-Wavenet-D'];
var currentVoice = voiceNames[Math.floor(Math.random() * voiceNames.length)];


var filename = 'output.mp3';
// The text to synthesize
const text = 'Hello, world!';




// Construct the request
const request = {
  input: {text: text},
  
  // Select the language and SSML Voice Gender (optional)
  //voice: {languageCode: 'en-US', name: "en-US-Wavenet-D"},
  voice: {languageCode: 'de-DE', name: currentVoice},

  // Select the type of audio encoding
  audioConfig: {audioEncoding: 'MP3', pitch: "0.00", speakingRate: "1.00"}
};

async function SaveAudio(request) {
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filename, response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}

console.log("Sending request");
SaveAudio(request);

//console.log(request);
