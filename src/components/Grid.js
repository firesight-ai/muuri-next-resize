'use client';

import dynamic from 'next/dynamic';

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