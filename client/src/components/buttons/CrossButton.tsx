export function CrossButton({ handleClean }: { handleClean: () => void }) {
  return (
    <button className="cross-button" onClick={handleClean}>
      &#10005;
    </button>
  );
}
