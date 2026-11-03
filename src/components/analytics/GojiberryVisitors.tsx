const GOJIBERRY_SCRIPT_SRC = "https://visitor.wv.gojiberry.ai/wv.js?uid=59621&aid=43171";

const GOJIBERRY_CONSENT_LINE =
  "window.GojiberryVisitors=window.GojiberryVisitors||{init:function(){window.GojiberryVisitors.initCalled=true}};";

const CONSENT_LINE_THEN_SCRIPT = `${GOJIBERRY_CONSENT_LINE}(function(){var s=document.createElement("script");s.async=true;s.src="${GOJIBERRY_SCRIPT_SRC}";document.head.appendChild(s)})();`;

export const GojiberryVisitors = () => <script dangerouslySetInnerHTML={{ __html: CONSENT_LINE_THEN_SCRIPT }} />;
