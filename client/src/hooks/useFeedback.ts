import { useEffect, useState } from "react";

export function useFeedback(time = 2000) {
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) return;
    setTimeout(() => setFeedback(null), time);
  }, [feedback, time]);

  return [feedback, setFeedback];
}
