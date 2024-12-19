'use client';

import * as React from 'react';
import { useRef } from 'react';
import { useRefresh } from "muuri-react";
import { ResizableBox } from "react-resizable";
import { debounce } from "underscore";

export const ResizableWrapper = (Component, options = {}) => {
  const WrappedComponent = React.memo(function WrappedComponent(props) {
    const ref = useRef(null);
    const refresh = useRefresh();
    const refreshWithDebounce = debounce(
      () => {
        if (refresh) {
          requestAnimationFrame(refresh);
        }
      },
      50
    );
    
    const width = options.widthIn || 300;
    const height = options.heightIn || 200;

    const handleResize = (_, { size }) => {
      if (ref.current) {
        ref.current.style.width = size.width + "px";
        ref.current.style.height = size.height + "px";
        refreshWithDebounce();
      }
    };

    return (
      <div
        ref={ref}
        className="item"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="muuri-item">
          <ResizableBox
            width={width}
            height={height}
            minConstraints={[width, height]}
            onResize={handleResize}
          >
            <Component {...props} />
          </ResizableBox>
        </div>
      </div>
    );
  });
  
  WrappedComponent.displayName = `ResizableWrapper(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};
