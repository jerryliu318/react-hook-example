
import { useState, useEffect } from 'react';

export default function useParsingLink(input, delay) {
  const [parsed, setParsed] = useState({ status: 'init', result: '' }); // status: init, loading, done
  const { status, result } = parsed;

  useEffect(() => {
    const regex = /(\s|^)https?:\/\/[^\s]+\.[^\s]+(\s|$)/;
    const match = input.match(regex);

    if (status === 'done' && match) {
      return () => {};
    }

    if (status === 'done' && !match) {
      setParsed({ status: 'init', result: '' });
      return () => {};
    }

    const handler = setTimeout(() => {
      setParsed({ status: 'done', result: match[0] });
    }, delay);

    if (match) {
      setParsed({ status: 'loading', result: match[0] });
    } else {
      clearTimeout(handler);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [delay, input, status, result]);

  return parsed;
}
