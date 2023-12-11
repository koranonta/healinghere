import { VoiceRecorder } from "react-voice-recorder-player"

  const styles = {
    mainContainerStyle: {
      backgroundColor: 'white',
      border: '1px solid lightgrey',
      borderRadius: '5px',
      padding: '10px',
    },
    controllerContainerStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2px'
    },
    controllerStyle: {
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '5px',
      cursor: 'pointer',
      //padding: '5px'
    },
    waveContainerStyle: {
      //display: 'none',
      height: '30px',
      marginTop: '0px',
      //width: '100%'
    }
  }

  const RecordVoice = ({startRecording, endRecording}) => {
    return <VoiceRecorder
      mainContainerStyle={styles.mainContainerStyle}
      controllerContainerStyle={styles.controllerContainerStyle}
      controllerStyle={styles.controllerStyle}
      downloadable={false}
      height={90}
      onRecordingStart={startRecording}
      onRecordingEnd={endRecording} />
  }

  export default RecordVoice
