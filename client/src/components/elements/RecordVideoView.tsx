import { ReactMediaRecorder } from "react-media-recorder";
import { PreviewVideoView } from "./PreviewVideoView";
import { CrossButton } from "../buttons/CrossButton";

export function RecordVideoView({
  handleChangeRecordingState,
  handleAddRecordingVideo,
}: {
  handleChangeRecordingState: () => void;
  handleAddRecordingVideo: () => void;
}) {
  return (
    <dialog open>
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
            <CrossButton handleClean={handleChangeRecordingState}></CrossButton>
            {status === "idle" ? (
              <h3>No has grabando nada todavía</h3>
            ) : status === "recording" ? (
              <h3>Grabando...</h3>
            ) : status === "stopped" ? (
              <h3>Resultado</h3>
            ) : (
              <h3>Cargando...</h3>
            )}
            {status === "recording" ? (
              <>
                <PreviewVideoView stream={previewStream}></PreviewVideoView>
              </>
            ) : (
              <>
                <video
                  src={mediaBlobUrl}
                  width={500}
                  height={500}
                  controls
                  autoPlay
                  loop
                />
              </>
            )}
            <button type="button" onClick={startRecording}>
              Empezar a grabar
            </button>
            <button type="button" onClick={stopRecording}>
              Parar de grabar
            </button>
            {status === "stopped" && (
              <button type="button" onClick={handleAddRecordingVideo}>
                Guardar video
              </button>
            )}
          </div>
        )}
      />
    </dialog>
  );
}
export const RecordView = () => (
  <div>
    <ReactMediaRecorder
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button type="button" onClick={startRecording}>
            Start Recording
          </button>
          <button type="button" onClick={stopRecording}>
            Stop Recording
          </button>
          <video src={mediaBlobUrl} controls autoPlay loop />
        </div>
      )}
    />
  </div>
);
