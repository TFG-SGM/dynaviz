export function ErrorComponent({ error }: { error: string }) {
  return <p className="error-message">{error}</p>;
}
