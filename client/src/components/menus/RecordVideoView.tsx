import { ReactMediaRecorder } from "react-media-recorder";
import { PreviewVideoView } from "../elements/PreviewVideoView";
import { Overlay } from "../other/Overlay";
import { toast } from "sonner";

export function RecordVideoView({
  handleChangeRecordingState,
}: {
  handleChangeRecordingState: () => void;
}) {
  const downloadVideo = (url: string | null) => {
    if (!url) return;
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "video.mp4";
    anchor.click();
    toast.success("Vídeo guardado correctamente ");
    toast.info("Seleccione el vídeo recién guardado");
    handleChangeRecordingState();
  };
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
                {status === "recording" ? (
                  <button type="button" onClick={stopRecording}>
                    Parar de Grabar
                  </button>
                ) : (
                  <button type="button" onClick={startRecording}>
                    Empezar a Grabar
                  </button>
                )}
                {status === "stopped" ? (
                  <button
                    type="button"
                    onClick={() => downloadVideo(mediaBlobUrl)}
                  >
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
