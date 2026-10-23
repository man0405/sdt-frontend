export const FEEDBACK_REFRESH_INTERVAL_MS = 5_000;

/** Refresh serially, pausing hidden/offline tabs and cancelling on cleanup. */
export function startAutoRefresh(
  refresh: (signal: AbortSignal) => Promise<void>,
  { immediate = true, intervalMs = FEEDBACK_REFRESH_INTERVAL_MS } = {}
) {
  let stopped = false;
  let controller: AbortController | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function canRefresh() {
    return !stopped && document.visibilityState !== "hidden" && navigator.onLine;
  }

  function clearTimer() {
    clearTimeout(timer);
    timer = undefined;
  }

  function schedule() {
    if (canRefresh()) timer = setTimeout(run, intervalMs);
  }

  function run() {
    if (!canRefresh() || controller) return;
    clearTimer();
    const requestController = new AbortController();
    controller = requestController;
    void refresh(requestController.signal)
      // The caller renders request errors; polling must still be able to recover.
      .catch(() => {})
      .finally(() => {
        controller = null;
        if (!canRefresh()) return;
        if (requestController.signal.aborted) run();
        else schedule();
      });
  }

  function pause() {
    clearTimer();
    controller?.abort();
  }

  function onVisibilityChange() {
    if (document.visibilityState === "hidden") pause();
    else run();
  }

  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("focus", run);
  window.addEventListener("online", run);
  window.addEventListener("offline", pause);
  if (immediate) run();
  else schedule();

  return () => {
    stopped = true;
    pause();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("focus", run);
    window.removeEventListener("online", run);
    window.removeEventListener("offline", pause);
  };
}
