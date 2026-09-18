"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function renderBlockLine(line, lineIdx) {
  if (typeof line === "string") {
    return <p key={lineIdx}>{line}</p>;
  }
  // line — массив сегментов вида { text, underline }
  return (
    <p key={lineIdx}>
      {line.map((seg, segIdx) =>
        seg.underline ? (
          <u key={segIdx}>{seg.text}</u>
        ) : (
          <span key={segIdx}>{seg.text}</span>
        )
      )}
    </p>
  );
}

export default function ScrollRow({ columns }) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = rowRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [updateArrows]);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    // Вертикальный скролл колёсика конвертируем в горизонтальный.
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollBy = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="scroll-wrap">
      <button
        type="button"
        className="scroll-arrow scroll-arrow--left"
        onClick={() => scrollBy(-1)}
        disabled={!canScrollLeft}
        aria-label="Прокрутить влево"
      >
        ←
      </button>

      <div className="scroll-row" ref={rowRef}>
        {columns.map((col, colIdx) => (
          <div className="scroll-col" key={colIdx}>
            <h3>{col.title}</h3>
            {col.blocks.map((block, blockIdx) => (
              <div className="scroll-col__block" key={blockIdx}>
                {block.map((line, lineIdx) => renderBlockLine(line, lineIdx))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="scroll-arrow scroll-arrow--right"
        onClick={() => scrollBy(1)}
        disabled={!canScrollRight}
        aria-label="Прокрутить вправо"
      >
        →
      </button>
    </div>
  );
}
