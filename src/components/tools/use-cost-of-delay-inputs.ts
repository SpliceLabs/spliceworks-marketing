import { useSyncExternalStore } from "react";
import { parseCostOfDelayInputs, serializeCostOfDelayInputs, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";

// The query string holds the inputs, so a shared link reproduces the result.
const URL_CHANGE = "cod:urlchange";

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE, onChange);
  };
};

const writeUrl = (inputs: CostOfDelayInputs) => {
  window.history.replaceState(null, "", `?${serializeCostOfDelayInputs(inputs)}`);
  window.dispatchEvent(new Event(URL_CHANGE));
};

/** Calculator inputs read from and written to the page URL. */
export function useCostOfDelayInputs() {
  // Server-rendered from an empty query, i.e. the defaults, so the page always shows a worked result.
  const query = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  const inputs = parseCostOfDelayInputs(query);
  const set = (key: keyof CostOfDelayInputs, value: number) => writeUrl({ ...inputs, [key]: value });
  return { inputs, set };
}
