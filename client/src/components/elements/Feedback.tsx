export function Feedback({ feedback }: { feedback: string }) {
  return (
    <p className={`feedback ${feedback.includes("Error") ? "red" : ""}`}>
      {feedback}
    </p>
  );
}
