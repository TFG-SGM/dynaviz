export function CrossButton({
  handleClean,
  isDisabled = false,
}: {
  handleClean: () => void;
  isDisabled?: boolean;
}) {
  return (
    <button
      className="cross-button"
      onClick={handleClean}
      disabled={isDisabled}
    >
      &#10005;
    </button>
  );
}
