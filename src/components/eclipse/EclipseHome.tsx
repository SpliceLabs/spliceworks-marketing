import { Accountable } from "./sections/Accountable";
import { Closing } from "./sections/Closing";
import { Gap } from "./sections/Gap";
import { Hero } from "./sections/Hero";
import { OneWorkflow } from "./sections/OneWorkflow";
import { Path } from "./sections/Path";
import { Proof } from "./sections/Proof";
import { SpliceLog } from "./sections/SpliceLog";
import { YourAi } from "./sections/YourAi";

export const EclipseHome = ({ headline }: { headline: string }) => (
  <>
    <Hero headline={headline} />
    <Gap />
    <Path />
    <OneWorkflow />
    <Accountable />
    <SpliceLog />
    <Proof />
    <YourAi />
    <Closing />
  </>
);
