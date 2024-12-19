'use client';

import { useState } from 'react';
import { Main, General } from "../src/components/Layout";
import Grid from "../src/components/Grid";
import { generateItems } from "../src/utils/items";

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

export default function Home() {
  const [items, setItems] = useState(generateItems());

  return (
    <General>
      <div className="top-bar">Firesight Dynamo UI</div>
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
