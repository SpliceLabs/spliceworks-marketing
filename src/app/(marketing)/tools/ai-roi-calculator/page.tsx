import { AiRoiCalculator } from "@/components/tools/AiRoiCalculator";
import { ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/copy/pages";

const PATH = "/tools/ai-roi-calculator";

export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <ToolPage path={PATH} name="AI ROI calculator">
      <AiRoiCalculator />
    </ToolPage>
  );
}
