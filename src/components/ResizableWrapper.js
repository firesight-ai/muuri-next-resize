'use client';

import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useRefresh } from 'muuri-react';
import { ResizableBox } from 'react-resizable';
import { debounce } from "underscore";

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
      return null;
    }

    return (
      <ResizableBox
        width={width}
        height={height}
        minConstraints={[width, height]}
        onResize={handleResize}
      >
        <div
          ref={ref}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Component {...props} />
        </div>
      </ResizableBox>
    );
  });
  
  WrappedComponent.displayName = `ResizableWrapper(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
};

export default ResizableWrapper;