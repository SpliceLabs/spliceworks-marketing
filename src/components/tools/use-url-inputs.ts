import { useSyncExternalStore } from "react";
import type { InputCodec, ToolInputs } from "@/lib/tools/inputs";

// The query string holds the inputs, so a shared link reproduces the result.
const URL_CHANGE = "tool:urlchange";

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE, onChange);
  };
};

const writeUrl = (query: string) => {
  window.history.replaceState(null, "", `?${query}`);
  window.dispatchEvent(new Event(URL_CHANGE));
};

/** Calculator inputs read from and written to the page URL. */
export function useUrlInputs<K extends string>(codec: InputCodec<K>) {
  // Server-rendered from an empty query, i.e. the defaults, so the page always shows a worked result.
  const query = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  const inputs: ToolInputs<K> = codec.parse(query);
  const set = (key: K, value: number) => writeUrl(codec.serialize({ ...inputs, [key]: value }));
  return { inputs, set };
}
