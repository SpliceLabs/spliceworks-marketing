import { pathLength } from "./path-length";

export const MAIN_SECONDS = 12;

export const MAIN_PATH =
  "M105 100 H1000 C1070 100 1070 230 1000 230 H330 V360 H1000 C1070 360 1070 415 1000 415 H105 C40 415 40 100 105 100 Z";

export const RETRY_LEG =
  "M820 100 H1000 C1070 100 1070 230 1000 230 H330 V196 C330 170 380 164 450 164 H700 C760 164 800 150 820 126 V100";

const APPROVED_FLOW =
  "H1000 C1070 100 1070 230 1000 230 H330 V360 H1000 C1070 360 1070 415 1000 415 H105 C40 415 40 100 105 100 H820";

export const REDRAFT_PATH = `${RETRY_LEG} ${APPROVED_FLOW}`;

export const weaveTiming = () => {
  const total = pathLength(REDRAFT_PATH);
  return {
    turnFraction: pathLength(RETRY_LEG) / total,
    redraftSeconds: (MAIN_SECONDS * total) / pathLength(MAIN_PATH),
  };
};
