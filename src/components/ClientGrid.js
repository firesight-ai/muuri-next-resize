'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const ResizableWrapper = dynamic(
  () => import("../../components/ResizableWrapper").then(mod => ({ default: mod.ResizableWrapper })),
  { ssr: false }
);

const { MuuriComponent } = await import('muuri-react');

const type_color = {
  Account: "orange",
  "Monthly Budget": "blue",
  Goals: "green"
};

// Base content component that will be wrapped
const BaseContent = ({ type, remove }) => (
  <div className={`content ${type_color[type]}`}>
    <div className="content-header" />
    <div className="card-text">{type}</div>
    <div className="card-remove">
      <i className="material-icons" onMouseDown={remove}>
        &#xE5CD;
      </i>
    </div>
  </div>
);

export default function ClientGrid({ items, setItems }) {
  const [mounted, setMounted] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
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
        propsToData={item => ({ id: item.id })}
      >
        {items.map(({ id, type }) => {
          const WrappedContent = ResizableWrapper(BaseContent);
          return (
            <div key={id} className="item">
              <div className="item-content">
                <WrappedContent
                  type={type}
                  remove={() => setItems(items.filter(item => item.id !== id))}
                />
              </div>
            </div>
          );
        })}
      </MuuriComponent>
    </div>
  );
}
