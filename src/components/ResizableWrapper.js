'use client';

import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { debounce } from "underscore";

// Dynamically import useRefresh from muuri-react
const useRefresh = dynamic(
  () => import('muuri-react').then(mod => mod.useRefresh),
  { ssr: false }
);

// Dynamically import ResizableBox
const ResizableBox = dynamic(
  () => import('react-resizable').then(mod => ({ default: mod.ResizableBox })),
  { ssr: false }
);

const ResizableWrapper = (Component, options = {}) => {
  const WrappedComponent = React.memo(function WrappedComponent(props) {
    const ref = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const refresh = useRefresh();
    
    useEffect(() => {
      setIsClient(true);
    }, []);

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

    if (!isClient) {
      return (
        <div
          ref={ref}
          className="item"
          style={{ width: `${width}px`, height: `${height}px` }}
          data-id={props.id}
        >
          <div className="muuri-item">
            <Component {...props} />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="item"
        style={{ width: `${width}px`, height: `${height}px` }}
        data-id={props.id}
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

export default ResizableWrapper;
