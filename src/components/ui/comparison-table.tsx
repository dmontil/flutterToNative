import { cn } from "@/lib/utils";

interface ComparisonRow {
    flutter: string;
    ios: string;
    notes?: string;
}

interface ComparisonTableProps {
    title: string;
    rows: ComparisonRow[];
    className?: string;
    rightLabel?: string;
    rightColorClass?: string;
}

export function ComparisonTable({ title, rows, className, rightLabel = "iOS (Swift/SwiftUI)", rightColorClass = "text-sky-500" }: ComparisonTableProps) {
    return (
        <div className={cn("rounded-lg border border-border overflow-hidden bg-card text-card-foreground shadow-sm", className)}>
            <div className="bg-muted px-6 py-4 border-b border-border">
                <h3 className="font-bold text-lg">{title}</h3>
            </div>
            <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1.5fr] text-sm md:text-base font-medium bg-muted/50 border-b border-border">
                <div className="p-4 text-indigo-500">Flutter</div>
                <div className={`p-4 ${rightColorClass}`}>{rightLabel}</div>
                <div className="hidden md:block p-4 text-muted-foreground">Key Differences</div>
            </div>
            <div className="divide-y divide-border">
                {rows.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1.5fr] transition-colors hover:bg-muted/10 group">
                        <div className="p-4 font-mono text-sm group-hover:bg-indigo-500/5 transition-colors">{row.flutter}</div>
                        <div className="p-4 font-mono text-sm group-hover:bg-sky-500/5 transition-colors">{row.ios}</div>
                        <div className="hidden md:block p-4 text-muted-foreground text-sm col-span-2 md:col-span-1 border-t md:border-t-0 border-border bg-muted/10 md:bg-transparent">
                            {row.notes}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
