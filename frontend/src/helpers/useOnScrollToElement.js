import { useState, useEffect } from 'react';

export function useOnScrollToElement(ref, callback, cleanup) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function elementInViewPort() {
      // getBoundingClientRect => returns the size of the given element and the position of it in relation to the view port
      const clientRect = ref.current.getBoundingClientRect();

      return (
        clientRect.top >= 0 &&
        clientRect.left >= 0 &&
        clientRect.bottom - 100 <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        clientRect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Flag to run only once
    let isScrolled = false;

    function checkViewPortCallback() {
      if (!isScrolled && elementInViewPort()) {
        isScrolled = true;
        setScrolled(true);
      }
    }

    window.onscroll = window.addEventListener('scroll', checkViewPortCallback);

    return () => {
      window.removeEventListener('scroll', checkViewPortCallback);
    };
  }, [ref]);

  useEffect(() => {
    if (scrolled) {
      callback();
    }
    return cleanup;
  }, [scrolled, callback, cleanup]);

  return [scrolled, setScrolled];
}