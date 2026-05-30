import { useEffect } from 'react';

let lockCount = 0;
let originalBodyOverflow = '';
let originalBodyPaddingRight = '';
let originalHtmlOverflow = '';

export function useBodyScrollLock(active = true) {
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const { body, documentElement } = document;

    if (lockCount === 0) {
      originalBodyOverflow = body.style.overflow;
      originalBodyPaddingRight = body.style.paddingRight;
      originalHtmlOverflow = documentElement.style.overflow;

      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

      body.style.overflow = 'hidden';
      documentElement.style.overflow = 'hidden';

      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);

      if (lockCount === 0) {
        body.style.overflow = originalBodyOverflow;
        body.style.paddingRight = originalBodyPaddingRight;
        documentElement.style.overflow = originalHtmlOverflow;
      }
    };
  }, [active]);
}
