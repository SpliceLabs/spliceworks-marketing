import { AiCheckUp } from "@/components/tools/AiCheckUp";
import { ToolPage } from "@/components/tools/ToolPage";
import { pageMetadata } from "@/lib/copy/pages";

const PATH = "/tools/ai-check-up";

export const metadata = pageMetadata(PATH);

export default function Page() {
  return (
    <ToolPage path={PATH} name="AI check-up">
      <AiCheckUp />
    </ToolPage>
  );
}
