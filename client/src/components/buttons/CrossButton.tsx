export function CrossButton({ handleClean }: { handleClean: () => void }) {
  return <button onClick={handleClean}>&#10005;</button>;
}
