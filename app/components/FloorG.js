import { floorG } from "../data/floors";
import ScrollRow from "./ScrollRow";

export default function FloorG() {
  return (
    <div className="floor">
      <span className="floor__label">{floorG.label}</span>
      <h1 className="floor__hero">{floorG.hero}</h1>
      <div className="floor__intro">
        {floorG.intro.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
      <ScrollRow columns={floorG.columns} />
    </div>
  );
}
