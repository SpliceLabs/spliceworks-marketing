import { CostOfDelayCalculator } from "@/components/tools/CostOfDelayCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/copy/pages";

const PATH = "/tools/ai-cost-of-delay";

export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <ToolPage path={PATH} name="AI cost of delay calculator">
      <CostOfDelayCalculator />
    </ToolPage>
  );
}
