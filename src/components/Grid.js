'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ResizableWrapper from "./ResizableWrapper";

const MuuriComponent = dynamic(
  () => import('muuri-react').then(mod => ({ default: mod.MuuriComponent })),
  { ssr: false }
);

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

const ClientGrid = dynamic(() => import('./ClientGrid'), {
  ssr: false,
});

export default function Grid({ items, setItems }) {
  return (
    <div className="grid-wrapper">
      <ClientGrid items={items} setItems={setItems} />
    </div>
  );
}
