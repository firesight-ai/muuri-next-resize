'use client';

import { useState, useEffect } from 'react';
import { MuuriComponent } from "muuri-react";
import { ResizableWrapper } from "./ResizableWrapper";

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

export default function Grid({ items, setItems }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Children
  const children = items.map(({ id, type }) => (
    <Item
      key={id}
      type={type}
      remove={() => setItems(items.filter((item) => item.id !== id))}
    />
  ));

  return (
    <MuuriComponent
      dragEnabled
      dragContainer={document.body}
      dragStartPredicate={{ handle: ".content-header" }}
    >
      {children}
    </MuuriComponent>
  );
}
