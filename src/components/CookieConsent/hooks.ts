"use client";

import { useSyncExternalStore } from "react";

/** Stable identity for `useSyncExternalStore` (do not allocate per render). */
const noopSubscribe = () => () => {};

const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}
