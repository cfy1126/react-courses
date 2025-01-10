import { useRef, useEffect } from 'react';

function useAutoScroll(dependencies) {
  console.log(dependencies);
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);
  return containerRef;
}

export default useAutoScroll;