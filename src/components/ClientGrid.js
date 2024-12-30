"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { MuuriComponent } from "muuri-react";
import ResizableWrapper from "./ResizableWrapper";

const type_color = {
  Account: "orange",
  "Monthly Budget": "blue",
  Goals: "green"
};

// Base content component
const BaseContent = ({ type, remove }) => (
  <div className={`content ${type_color[type]}`}>
    <div className="content-header" />
    <div className="card-text">{type}</div>
    <div className="card-remove">
      <i className="material-icons" onClick={remove}>
        &#xE5CD;
      </i>
    </div>
  </div>
);

// Create the wrapped component once
const WrappedContent = ResizableWrapper(BaseContent);

export default function ClientGrid({ items, setItems }) {
  const [mounted, setMounted] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Add a small delay to ensure components are properly rendered
    const timer = setTimeout(() => {
      if (gridRef.current) {
        gridRef.current.refreshItems();
        gridRef.current.layout(true);
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid-container">
      <MuuriComponent
        ref={gridRef}
        dragEnabled
        dragContainer={document.body}
        dragHandle=".content-header"
        dragSort={true}
        layout={{
          fillGaps: true,
          horizontal: false,
          alignRight: false,
          alignBottom: false,
          rounding: false
        }}
      >
        {items.map(({ id, type }) => (
          <div key={id} data-item-id={id} className="item">
            <div
              className="item-content"
              style={{ width: "100%", height: "100%" }}
            >
              <div
                className="card"
                style={{ backgroundColor: type_color[type] }}
              >
                <WrappedContent
                  type={type}
                  remove={() =>
                    setItems(items.filter((item) => item.id !== id))
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </MuuriComponent>
    </div>
  );
}
