import { ReactMediaRecorder } from "react-media-recorder";
import { PreviewVideoView } from "./PreviewVideoView";
import { Overlay } from "../other/Overlay";

export function RecordVideoView({
  handleChangeRecordingState,
  handleAddRecordingVideo,
}: {
  handleChangeRecordingState: () => void;
  handleAddRecordingVideo: () => void;
}) {
  return (
    <>
      <Overlay></Overlay>
      <dialog open className="record-dialog">
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
              {status === "idle" ? (
                <h3>No has grabando nada todavía</h3>
              ) : status === "recording" ? (
                <h3>Grabando...</h3>
              ) : status === "stopped" ? (
                <h3>Vídeo grabado</h3>
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
                    src={mediaBlobUrl ? mediaBlobUrl : undefined}
                    controls
                    autoPlay
                    loop
                  />
                </>
              )}
              <div className="buttons-container">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleChangeRecordingState}
                >
                  Cancelar
                </button>
                <button type="button" onClick={stopRecording}>
                  Parar de Grabar
                </button>
                <button type="button" onClick={startRecording}>
                  Empezar a Grabar
                </button>
                {status === "stopped" ? (
                  <button type="button" onClick={handleAddRecordingVideo}>
                    Guardar Vídeo
                  </button>
                ) : (
                  <button className="save-video-disable" type="button">
                    Guardar Vídeo
                  </button>
                )}
              </div>
            </div>
          )}
        />
      </dialog>
    </>
  );
}
