import React, { useEffect, useState } from 'react'

export function useDevLoading() {
  const [devLoading, setDevLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setDevLoading(false), 500)
  }, []);

  return devLoading;
}
