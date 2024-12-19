'use client';

import { useState, useEffect, useRef } from 'react';
import { MuuriComponent } from "muuri-react";
import ResizableWrapper from "./ResizableWrapper";

const type_color = {
  Account: "orange",
  "Monthly Budget": "blue",
  Goals: "green"
};

// Item component
const Item = ResizableWrapper(
  ({ type, remove }) => (
    <div className={`content ${type_color[type]}`}>
      <div className="content-header" />
      <div className="card-text">{type}</div>
      <div className="card-remove">
        <i className="material-icons" onMouseDown={remove}>
          &#xE5CD;
        </i>
      </div>
    </div>
  ),
  {}
);

export default function ClientGrid({ items, setItems }) {
  const [mounted, setMounted] = useState(false);
  const gridContainerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const children = items.map(({ id, type }) => (
    <Item
      key={id}
      type={type}
      remove={() => setItems(items.filter((item) => item.id !== id))}
    />
  ));

  return (
    <div ref={gridContainerRef} className="grid-container">
      <div className="grid">
        <MuuriComponent
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
          propsToCheck={["items"]}
        >
          {children}
        </MuuriComponent>
      </div>
    </div>
  );
}
