import React, {useState, useEffect} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const VoiceRecorder = () => {
  const [state, setState] = useState({
    isRecording: false,
    blobURL: '',
    isBlocked: false,
  })

  const start = () => {
    if (state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setState({ ...state, isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setState({  ...state, blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  useEffect(() => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        setState({  ...state, isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        setState({  ...state, isBlocked: true })
      },
    );
  },[])


    return (
      <div className="App">
        <header className="App-header">
          <button onClick={start} disabled={state.isRecording}>Record</button>
          <button onClick={stop} disabled={!state.isRecording}>Stop</button>
          <audio src={state.blobURL} controls="controls" />
        </header>
      </div>
    );
}

export default VoiceRecorder;


/*

const VoiceRecorder = () =>{
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [state, setState] = React.useState({
    isRecording: false,
    blobURL: '',
    isBlocked: false,
    trackProgress: 0,
  });
  let musicRef = React.useRef(null);
  let intervalRef = React.useRef(null);

  React.useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted');
        setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        setState({ isBlocked: true });
      }
    );
  }, []);

  React.useEffect(() => {
    if (isPlaying) {
      musicRef?.current?.play?.();
      startTimer();
    } else {
      musicRef?.current?.pause?.();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const start = () => {
    if (state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder.start()
        .then(() => {
          setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () =>
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setState({ blobURL, isRecording: false });
        musicRef.current = new Audio(blobURL);
      })
      .catch((e) => console.log(e));

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      if (musicRef?.current?.duration === musicRef?.current?.currentTime) {
        musicRef?.current?.pause?.();
        clearInterval(intervalRef?.current);
      }
      setState({
        ...state,
        trackProgress: musicRef?.current?.currentTime,
      });
    }, 100);
  };

  const onChangeTrackProgress = (e) => {
    setState({
      ...state,
      trackProgress: e.target.value,
    });
    musicRef.current.currentTime = e.target.value;
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={start} disabled={state.isRecording}>
          Record
        </button>
        <button onClick={stop} disabled={!state.isRecording}>
          Stop
        </button>
      </header>

      <div className="audio-player-progress">
        <input
          type="range"
          min={'0'}
          step={'0.01'}
          max={`${musicRef?.current?.duration || 0}`}
          value={`${state?.trackProgress || 0}`}
          class="slider"
          id="myRange"
          onChange={onChangeTrackProgress}
        />
      </div>

      <div className="audio-controls flex justify-sb">
        <div className="play-pause-btn">
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );
}

*/