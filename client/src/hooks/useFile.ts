import { useEffect, useState } from "react";
import { DataService } from "../services/DataService";
import { FILE_ENDPOINT, URL } from "../utils/constants";

export function useFile(id: string | undefined, type: string) {
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchVideo = async () => {
      const token = await DataService.getToken();

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(URL + FILE_ENDPOINT + id + type, {
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
  }, [id, type]);

  return [videoBlob];
}
