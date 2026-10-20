"use client";

import { useState } from "react";
import { CopyButton } from "@/app/map-playground/ui";

type Props = {
  htmlSource: string;
  htmlCode: string;
  reactSource: string | null;
  reactCode: string | null;
  textLink: string;
  apiKeyPlaceholder: string;
};

export function CodeTabs({
  htmlSource,
  htmlCode,
  reactSource,
  reactCode,
  textLink,
  apiKeyPlaceholder,
}: Props) {
  const [tab, setTab] = useState<"html" | "react">("html");
  const hasReact = !!reactSource;

  const source = tab === "react" && reactSource ? reactSource : htmlSource;
  const code = tab === "react" && reactCode ? reactCode : htmlCode;

  return (
    <div className="flex flex-col gap-3">
      {hasReact && (
        <div className="flex gap-1 rounded-lg border border-border bg-raised p-1 self-start">
          {(["html", "react"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 " +
                (tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-soft hover:text-foreground")
              }
            >
              {t === "html" ? "HTML" : "React"}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] leading-[1.6] text-soft">
          Replace <code className="font-mono text-[13px] text-foreground">{apiKeyPlaceholder}</code>{" "}
          with a key from your{" "}
          <a href="https://gebeta.app/auth/register" className={textLink}>
            Gebeta dashboard
          </a>
          {tab === "html" ? (
            <>
              {", save the file as "}
              <code className="font-mono text-[13px] text-foreground">index.html</code>
              {" and open it in a browser."}
            </>
          ) : (
            <>
              {". Install "}
              <code className="font-mono text-[13px] text-foreground">@gebeta/react</code>
              {" and drop the component into your app."}
            </>
          )}
        </p>
        <CopyButton text={source} />
      </div>

      <div
        key={tab}
        className="example-code overflow-x-auto rounded-lg border border-border bg-raised p-4 font-mono text-[13px] leading-[1.6]"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
}
