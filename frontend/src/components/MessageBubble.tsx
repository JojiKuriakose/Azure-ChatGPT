import React, { useState } from "react";
import type { MessageBubbleProps } from "../types";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

// @heroicons/react
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

import "highlight.js/styles/github.css";
import type { Components } from "react-markdown";

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const components: Components = {
        h1: ({ ...props }) => <h1 className="text-2xl font-bold my-3" {...props} />,
        h2: ({ ...props }) => <h2 className="text-xl font-semibold my-2" {...props} />,
        h3: ({ ...props }) => <h3 className="text-lg font-medium my-2" {...props} />,
        p: ({ node, ...props }) => {
            if (
                node &&
                "children" in node &&
                Array.isArray(node.children) &&
                node.children.length === 1
            ) {
                const first = node.children[0] as any;
                if (first?.type === "element" && first?.tagName === "pre") {
                    return <>{props.children}</>;
                }
            }
            return <p className="my-2 leading-relaxed" {...props} />;
        },
        ul: ({ ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
        li: ({ ...props }) => <li className="my-1" {...props} />,
        code: ({ inline, className, children, ...props }: any) => {
            if (inline) {
                return (
                    <code className="bg-gray-200 rounded px-1 py-0.5 text-sm">
                        {children}
                    </code>
                );
            }
            return (
                <pre className="bg-gray-100 rounded p-3 my-2 overflow-x-auto">
                    <code className={className} {...props}>
                        {children}
                    </code>
                </pre>
            );
        },
        a: ({ ...props }) => (
            <a
                className={`${message.role === "user" ? "text-blue-200" : "text-blue-600"
                    } hover:underline`}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            />
        ),
        table: ({ ...props }) => (
            <div className="overflow-x-auto">
                <table className="border-collapse my-3 w-full" {...props} />
            </div>
        ),
        th: ({ ...props }) => (
            <th
                className="border border-gray-300 px-3 py-2 text-left bg-gray-100"
                {...props}
            />
        ),
        td: ({ ...props }) => (
            <td className="border border-gray-300 px-3 py-2" {...props} />
        ),
        blockquote: ({ ...props }) => (
            <blockquote
                className="border-l-4 border-gray-300 pl-4 my-2 italic text-gray-600"
                {...props}
            />
        ),
    }
    return (
        <div>
            <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div className={`relative px-4 py-3 rounded-xl max-w-[85%] ${message.role === "user" ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"}`}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={components} remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>


                    {message.role === "assistant" && (
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-1 px-2 py-1 text-xs rounded ${copied
                                        ? "text-green-600 bg-green-50"
                                        : "text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <CheckIcon className="h-3 w-3" />
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <ClipboardDocumentIcon className="h-3 w-3" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
