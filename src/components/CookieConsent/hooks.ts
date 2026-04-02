"use client";

import { useSyncExternalStore } from "react";

export const useIsClient = () => {
  const noopSubscribe = () => () => {};
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
};
