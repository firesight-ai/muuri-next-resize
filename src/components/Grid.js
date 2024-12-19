'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const ResizableWrapper = dynamic(
  () => import("./ResizableWrapper"),
  { ssr: false }
);

const MuuriComponent = dynamic(
  () => import('muuri-react').then(mod => ({ default: mod.MuuriComponent })),
  { ssr: false }
);

const type_color = {
  Account: "orange",
  "Monthly Budget": "blue",
  Goals: "green"
};

// Item component will be created after ResizableWrapper is loaded
const Item = ({ type, remove }) => {
  const WrappedComponent = ResizableWrapper(
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

  return <WrappedComponent type={type} remove={remove} />;
};

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
