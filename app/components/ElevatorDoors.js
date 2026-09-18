// Две дверные панели лифта: разъезжаются от центра в стороны при открытии,
// съезжаются к центру при закрытии. Управляется классом doors--open снаружи.
export default function ElevatorDoors({ open }) {
  return (
    <div
      className={"doors" + (open ? " doors--open" : "")}
      aria-hidden="true"
    >
      <div className="door door--left" />
      <div className="door door--right" />
    </div>
  );
}
