export function TestButtons({ handleChangeChart }) {
  return (
    <div>
      <button id="time" className="active-chart" onClick={handleChangeChart}>
        Tiempo
      </button>
      <button id="ranking1" onClick={handleChangeChart}>
        Ranking
      </button>
      <button id="whole1" onClick={handleChangeChart}>
        Conjunto
      </button>
      <button id="distribution" onClick={handleChangeChart}>
        Distribución
      </button>
      <button id="correlation" onClick={handleChangeChart}>
        Correlación
      </button>
    </div>
  );
}