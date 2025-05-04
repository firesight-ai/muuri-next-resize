'use client';

import { useState } from 'react';
import { Main, General } from "../src/components/Layout";
import Grid from "../src/components/Grid";
import { generateItems } from "../src/utils/items";

export default function Home() {
  const [items, setItems] = useState(generateItems());

  return (
    <General>
      <div className="top-bar">muuri-next-resize</div>
      <Main>
        <div>
          <div>
            <Grid items={items} setItems={setItems} />
          </div>
        </div>
      </Main>
    </General>
  );
}
