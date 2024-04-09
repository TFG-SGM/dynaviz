import { useEffect, useState } from "react";
import { DataService } from "../services/DataService";
import { URL, VIDEO_ENDPOINT } from "../utils/constants";

export function useVideo(id: string) {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const token = await DataService.getToken();

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(URL + VIDEO_ENDPOINT + id, {
          headers,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }

        const blob = await response.blob();
        setVideoBlob(blob);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchVideo();
  }, [id]);

  return [videoBlob];
}
