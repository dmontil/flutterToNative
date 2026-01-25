"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Code, Info, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAPPINGS = [
    {
        flutter: "Container / SizedBox",
        swiftui: "VStack / HStack / Color / .frame()",
        description: "En SwiftUI, un Container no existe como tal. Usamos Layout Stacks o modificadores de frame sobre cualquier vista.",
        flutterCode: "Container(\n  width: 100,\n  height: 100,\n  color: Colors.blue,\n  child: Text('Hi'),\n)",
        swiftuiCode: "Text('Hi')\n  .frame(width: 100, height: 100)\n  .background(Color.blue)"
    },
    {
        flutter: "Column / Row",
        swiftui: "VStack / HStack",
        description: "La alineación y distribución funcionan igual, pero SwiftUI usa Spacers explícitos en lugar de MainAxisAlignment.spaceBetween.",
        flutterCode: "Column(\n  mainAxisAlignment: MainAxisAlignment.center,\n  children: [Text('A'), Text('B')],\n)",
        swiftuiCode: "VStack(alignment: .center) {\n  Text('A')\n  Text('B')\n}"
    },
    {
        flutter: "Stack",
        swiftui: "ZStack",
        description: "Ambos apilan elementos en el eje Z. En SwiftUI, el último elemento de la lista es el que queda arriba.",
        flutterCode: "Stack(\n  children: [\n    Image.asset('bg'),\n    Text('Overlay'),\n  ],\n)",
        swiftuiCode: "ZStack {\n  Image('bg')\n  Text('Overlay')\n}"
    },
    {
        flutter: "ListView.builder",
        swiftui: "List / ForEach",
        description: "SwiftUI List maneja automáticamente el scroll y el reciclaje de celdas. Es mucho más declarativo.",
        flutterCode: "ListView.builder(\n  itemCount: items.length,\n  itemBuilder: (context, i) => Text(items[i]),\n)",
        swiftuiCode: "List(items) { item in\n  Text(item)\n}"
    },
    {
        flutter: "StatefulWidget / setState",
        swiftui: "@State / View body",
        description: "En SwiftUI no llamas a un método para redibujar. Al cambiar una propiedad marcada con @State, la vista se invalida y se recalcula automáticamente.",
        flutterCode: "int counter = 0;\n\nsetState(() => counter++);",
        swiftuiCode: "@State private var counter = 0\n\ncounter += 1 // UI updates auto"
    },
    {
        flutter: "Expanded / Flexible",
        swiftui: "Spacer() / .frame(maxWidth: .infinity)",
        description: "Para ocupar todo el espacio disponible, SwiftUI usa Spacers dentro de Stacks o modificadores de frame.",
        flutterCode: "Expanded(\n  child: Container(color: Colors.red),\n)",
        swiftuiCode: "Color.red\n  .frame(maxWidth: .infinity)"
    },
    {
        flutter: "Padding widget",
        swiftui: ".padding() modifier",
        description: "En SwiftUI el padding es un modificador, no un widget envolvente. El orden de los modificadores importa.",
        flutterCode: "Padding(\n  padding: EdgeInsets.all(8.0),\n  child: Text('Hello'),\n)",
        swiftuiCode: "Text('Hello')\n  .padding(8)"
    }
];

export default function WidgetMapPage() {
    const [search, setSearch] = useState("");

    const filteredMappings = MAPPINGS.filter(m =>
        m.flutter.toLowerCase().includes(search.toLowerCase()) ||
        m.swiftui.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            The Widget-to-Swift <span className="text-indigo-500">Map</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            The interactive Rosetta Stone for Flutter Developers moving to SwiftUI.
                        </p>
                    </div>

                    <div className="relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search a Widget (e.g. Column, Stack, setState...)"
                            className="pl-12 h-14 text-lg bg-card border-2 border-indigo-500/20 focus:border-indigo-500 transition-all rounded-xl"
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
                                            <div className="bg-indigo-500/10 p-2 rounded-lg">
                                                <Info className="h-5 w-5 text-indigo-500" />
                                            </div>
                                            <span className="font-bold text-lg text-indigo-500">{mapping.swiftui}</span>
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
                                            <Code className="h-4 w-4 text-indigo-400" />
                                            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">SwiftUI</span>
                                        </div>
                                        <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                                            <code>{mapping.swiftuiCode}</code>
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

                    <div className="mt-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Want the full transition guide?</h3>
                        <p className="text-muted-foreground mb-6">
                            This is just 1% of the knowledge required to become a Senior iOS Engineer. Unlock the professional playbook.
                        </p>
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
                            <a href="/premium">Get Premium Access</a>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
