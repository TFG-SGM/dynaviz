import { ReactMediaRecorder } from "react-media-recorder";
import { PreviewVideoView } from "./PreviewVideoView";

export function RecordVideoView() {
  return (
    <div>
      <ReactMediaRecorder
        video
        render={({
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
          previewStream,
        }) => (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>Empezar a grabar</button>
            <button onClick={stopRecording}>Parar de grabar</button>
            <video src={mediaBlobUrl} controls autoPlay loop />
            <PreviewVideoView stream={previewStream}></PreviewVideoView>
          </div>
        )}
      />
    </div>
  );
}
