"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ElevatorDoors from "./components/ElevatorDoors";
import FloorG from "./components/FloorG";
import FloorSoon from "./components/FloorSoon";

const DOOR_MS = 1000; // должно совпадать с --door-duration в globals.css
const DEFAULT_FLOOR = "G"; // единственный этаж с готовым дизайном

// Состояния лифта:
// closed   — двери закрыты, кнопки серые (стартовый экран)
// opening  — двери открываются (после клика или при первой загрузке)
// open     — двери открыты, можно свободно переключать этажи
// closing  — двери закрываются перед переходом на новый этаж
export default function Home() {
  const [doorState, setDoorState] = useState("closed");
  const [activeFloor, setActiveFloor] = useState(DEFAULT_FLOOR);
  const [pendingFloor, setPendingFloor] = useState(null);

  // Автооткрытие при первом заходе на сайт.
  useEffect(() => {
    const t = setTimeout(() => setDoorState("opening"), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (doorState === "opening") {
      const t = setTimeout(() => setDoorState("open"), DOOR_MS);
      return () => clearTimeout(t);
    }
    if (doorState === "closing") {
      const t = setTimeout(() => {
        if (pendingFloor) {
          setActiveFloor(pendingFloor);
          setPendingFloor(null);
        }
        setDoorState("opening");
      }, DOOR_MS);
      return () => clearTimeout(t);
    }
  }, [doorState, pendingFloor]);

  const handleSelectFloor = useCallback(
    (floor) => {
      if (floor === activeFloor) return;
      if (doorState !== "open") return; // не даём кликать во время анимации
      setPendingFloor(floor);
      setDoorState("closing");
    },
    [activeFloor, doorState]
  );

  const doorsOpen = doorState === "open" || doorState === "opening";
  const doorsReady = doorState === "open";

  return (
    <div className="app-shell">
      <Header />
      <div className="main-row">
        <div className="content-area">
          {activeFloor === "G" ? (
            <FloorG />
          ) : (
            <FloorSoon floorId={activeFloor} />
          )}
          <ElevatorDoors open={doorsOpen} />
        </div>
        <div className="divider-line" />
        <Sidebar
          activeFloor={activeFloor}
          doorsReady={doorsReady}
          onSelectFloor={handleSelectFloor}
        />
      </div>
    </div>
  );
}
