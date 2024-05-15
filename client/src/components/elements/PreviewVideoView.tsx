import { useEffect, useRef } from "react";

export function PreviewVideoView({ stream }: { stream: MediaStream | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return <p>No esta grabando</p>;
  }
  return <video ref={videoRef} autoPlay />;
}
