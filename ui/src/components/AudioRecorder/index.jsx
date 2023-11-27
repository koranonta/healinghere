/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';

//Css 
import './AudioRecorder.css'

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'recorded-audio.wav';
      link.click();
    }
  };

  const clearRecording = () => {
    audioChunks.current = []
    setAudioUrl(null)
  }

  return (
    <>
      <div className='grid-audio mt-5'>
        <div className='grid-content-audio'>
          <button className='btn btn-sm btn-success' onClick={startRecording} disabled={recording}>
            <i className="fas fa-play"> Start</i>
          </button>
        </div>
        <div className='grid-content-audio'>
          <button className='btn btn-sm btn-danger' onClick={stopRecording} disabled={!recording}>
            <i className="fas fa-stop"> Stop</i>
          </button>
        </div>
        <div className='grid-content-audio'>
          <button className='btn btn-sm btn-danger' onClick={clearRecording} >
            <i className="fas fa-stop"> Clear</i>
          </button>
        </div>

        {/* <div className='grid-content-audio'>
          <button className='btn btn-sm btn-info' onClick={playAudio} disabled={!audioUrl}>
            <i className="fas fa-history">Re-Play</i>
          </button>
        </div>
        <div className='grid-content-audio'>
          <button className='btn btn-sm btn-info' onClick={downloadAudio} disabled={!audioUrl}>
          <i className="fas fa-download">Download</i>
          </button>
        </div> */}
      </div>
      <div className='d-flex justify-content-start mt-4'>
        {audioUrl && <audio controls src={audioUrl} />}
      </div>
    </>
  );
};

export default AudioRecorder;
