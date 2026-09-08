import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";

const AccordionItem = ({
  title,
  content,
  defaultOpen = false,
  type = "text",
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-slate-800">
          {title}
        </span>

        {open ? (
          <ChevronDown size={18} className="text-slate-500" />
        ) : (
          <ChevronRight size={18} className="text-slate-500" />
        )}
      </button>

      {/* Content */}
      {open && (
        <div className="pb-4">

          {/* Normal Text */}
          {type === "text" && (
            <div className="text-sm text-slate-600 leading-7 whitespace-pre-wrap">
              {content}
            </div>
          )}

          {/* Ordered List */}
          {type === "list" && (
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600 leading-7">
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          )}

          {/* Code */}
          {type === "code" && (
            <>
              <div className="flex items-center justify-between mb-2">

                <span className="text-xs font-medium text-slate-500">
                  Java
                </span>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>

              </div>

              <pre className="rounded-lg bg-slate-900 p-4 overflow-x-auto text-sm text-slate-100">
                <code>{content}</code>
              </pre>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default AccordionItem;