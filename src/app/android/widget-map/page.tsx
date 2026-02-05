"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Code, Info, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAPPINGS = [
    {
        flutter: "Container / SizedBox",
        compose: "Box / Modifier.size",
        description: "Compose uses Box and Modifiers instead of a dedicated Container widget.",
        flutterCode: "Container(\n  width: 100,\n  height: 100,\n  color: Colors.blue,\n  child: Text('Hi'),\n)",
        composeCode: "Box(\n  modifier = Modifier\n    .size(100.dp)\n    .background(Color.Blue)\n) { Text(\"Hi\") }"
    },
    {
        flutter: "Column / Row",
        compose: "Column / Row",
        description: "Same mental model. Use Arrangement and Alignment to control spacing.",
        flutterCode: "Column(\n  mainAxisAlignment: MainAxisAlignment.center,\n  children: [Text('A'), Text('B')],\n)",
        composeCode: "Column(\n  verticalArrangement = Arrangement.Center,\n) {\n  Text(\"A\")\n  Text(\"B\")\n}"
    },
    {
        flutter: "Stack",
        compose: "Box + align",
        description: "Compose uses Box with modifiers to layer children.",
        flutterCode: "Stack(\n  children: [\n    Image.asset('bg'),\n    Text('Overlay'),\n  ],\n)",
        composeCode: "Box {\n  Image(painterResource(R.drawable.bg), null)\n  Text(\"Overlay\", modifier = Modifier.align(Alignment.Center))\n}"
    },
    {
        flutter: "ListView.builder",
        compose: "LazyColumn",
        description: "LazyColumn is the Compose equivalent for efficient lists.",
        flutterCode: "ListView.builder(\n  itemCount: items.length,\n  itemBuilder: (context, i) => Text(items[i]),\n)",
        composeCode: "LazyColumn {\n  items(items) { item ->\n    Text(item)\n  }\n}"
    },
    {
        flutter: "StatefulWidget / setState",
        compose: "remember / mutableStateOf",
        description: "State in Compose is held via remember and state delegates.",
        flutterCode: "int counter = 0;\n\nsetState(() => counter++);",
        composeCode: "var counter by remember { mutableStateOf(0) }\n\ncounter += 1 // UI updates auto"
    },
    {
        flutter: "Expanded / Flexible",
        compose: "Modifier.weight",
        description: "Use weight inside Row/Column to expand a child.",
        flutterCode: "Expanded(\n  child: Container(color: Colors.red),\n)",
        composeCode: "Box(\n  modifier = Modifier\n    .weight(1f)\n    .background(Color.Red)\n)"
    },
    {
        flutter: "Padding widget",
        compose: "Modifier.padding",
        description: "Padding is a modifier chained directly on the Composable.",
        flutterCode: "Padding(\n  padding: EdgeInsets.all(8.0),\n  child: Text('Hello'),\n)",
        composeCode: "Text(\"Hello\", modifier = Modifier.padding(8.dp))"
    }
];

export default function AndroidWidgetMapPage() {
    const [search, setSearch] = useState("");

    const filteredMappings = MAPPINGS.filter(m =>
        m.flutter.toLowerCase().includes(search.toLowerCase()) ||
        m.compose.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            The Widget-to-Compose <span className="text-green-500">Map</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            The Rosetta Stone for Flutter developers moving to Jetpack Compose.
                        </p>
                    </div>

                    <div className="relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search a Widget (e.g. Column, Stack, setState...)"
                            className="pl-12 h-14 text-lg bg-card border-2 border-green-500/20 focus:border-green-500 transition-all rounded-xl"
                        />
                    </div>

                    <div className="space-y-8">
                        {filteredMappings.map((mapping, i) => (
                            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6 border-b border-border bg-muted/30">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-500/10 p-2 rounded-lg">
                                                <Layers className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <span className="font-bold text-lg">{mapping.flutter}</span>
                                        </div>
                                        <ArrowRight className="hidden md:block h-5 w-5 text-muted-foreground" />
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-500/10 p-2 rounded-lg">
                                                <Info className="h-5 w-5 text-green-500" />
                                            </div>
                                            <span className="font-bold text-lg text-green-500">{mapping.compose}</span>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-muted-foreground text-sm italic">
                                        {mapping.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-6 bg-slate-950 border-r border-border/10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Code className="h-4 w-4 text-blue-400" />
                                            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Flutter</span>
                                        </div>
                                        <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                                            <code>{mapping.flutterCode}</code>
                                        </pre>
                                    </div>
                                    <div className="p-6 bg-slate-900">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Code className="h-4 w-4 text-green-400" />
                                            <span className="text-xs font-mono text-green-400 uppercase tracking-widest">Compose</span>
                                        </div>
                                        <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                                            <code>{mapping.composeCode}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredMappings.length === 0 && (
                        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                            <p className="text-muted-foreground">No mappings found for "{search}".</p>
                            <Button variant="ghost" className="mt-4" onClick={() => setSearch("")}>Clear search</Button>
                        </div>
                    )}

                    <div className="mt-16 bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Want the full transition guide?</h3>
                        <p className="text-muted-foreground mb-6">
                            This is just 1% of the knowledge required to become a Senior Android Engineer. Unlock the professional playbook.
                        </p>
                        <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                            <a href="/premium">Get Premium Access</a>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
