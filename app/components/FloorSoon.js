import { floorG } from "../data/floors";

export default function FloorSoon({ floorId }) {
  return (
    <div className="floor">
      <span className="floor__label">FLOOR {floorId}</span>
      <h1 className="floor__hero">СКОРО</h1>
      <div className="floor__intro">
        {floorG.intro.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
      <div className="soon">Этот этаж ещё в разработке — загляните позже</div>
    </div>
  );
}
