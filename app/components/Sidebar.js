import { floorsOrder } from "../data/floors";

export default function Sidebar({ activeFloor, doorsReady, onSelectFloor }) {
  return (
    <nav className="sidebar" aria-label="Выбор этажа">
      {floorsOrder.map((floor) => {
        const isActive = floor === activeFloor;
        return (
          <button
            key={floor}
            type="button"
            className={
              "floor-btn" +
              (isActive ? " floor-btn--active" : "") +
              (!doorsReady && !isActive ? " floor-btn--disabled" : "")
            }
            disabled={!doorsReady && !isActive}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelectFloor(floor)}
          >
            {floor}
          </button>
        );
      })}
    </nav>
  );
}
