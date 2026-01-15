"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeSnippet {
    language: string;
    code: string;
    label: string;
    description?: string;
}

interface CodeComparisonProps {
    title: string;
    snippets: CodeSnippet[];
}

export function CodeComparison({ title, snippets }: CodeComparisonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const allCode = snippets.map(s => `// ${s.label} (${s.language})\n${s.code}`).join("\n\n");
        navigator.clipboard.writeText(allCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm my-8">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-bold text-sm tracking-wide">{title}</h3>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-background rounded-md transition-colors text-muted-foreground hover:text-foreground"
                    title="Copy all code"
                >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>

            {/* Split View Content */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                {snippets.map((snippet, idx) => (
                    <div key={idx} className="flex flex-col min-w-0">
                        {/* Language Label */}
                        <div className="px-4 py-2 bg-[#0d1117] border-b border-white/5 flex items-center justify-between">
                            <span className={cn(
                                "text-xs font-mono font-bold uppercase",
                                snippet.label.toLowerCase().includes("flutter") || snippet.label.toLowerCase().includes("dart")
                                    ? "text-indigo-400"
                                    : "text-sky-400"
                            )}>
                                {snippet.label}
                            </span>
                            <span className="text-[10px] text-gray-500">{snippet.language}</span>
                        </div>

                        {/* Code Block */}
                        <div className="flex-1 bg-[#0d1117] p-4 overflow-x-auto relative group">
                            <pre className="font-mono text-sm leading-relaxed text-gray-300">
                                <code>{snippet.code}</code>
                            </pre>
                        </div>

                        {/* Optional Description per side */}
                        {snippet.description && (
                            <div className="p-3 bg-muted/20 border-t border-border text-xs text-muted-foreground">
                                {snippet.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
