import { useEffect, useState } from "react"

export default function useIsTouchSupported() {
  const [isTouchSupported, setIsTouchSupported] = useState(false);

  useEffect(() => {
    function checkTouchSupport() {
      setIsTouchSupported(window.matchMedia('(pointer: coarse)').matches);
    };

    checkTouchSupport();

    window.addEventListener('resize', checkTouchSupport);

    return () => {
      window.removeEventListener('resize', checkTouchSupport);
    };
  }, []);

  return isTouchSupported;
}