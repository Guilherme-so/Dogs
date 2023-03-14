import { useEffect, useState } from "react";

function useMobile(tamanho) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    function changeMidia() {
      const { matches } = window.matchMedia(tamanho);
      setIsMobile(matches);
    }
    changeMidia();
    window.addEventListener("resize", changeMidia);
    return () => window.removeEventListener("resize", changeMidia);
  }, [tamanho]);

  return isMobile;
}

export default useMobile;
