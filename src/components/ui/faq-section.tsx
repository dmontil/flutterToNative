"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
    {
        question: "¿El contenido está actualizado para Swift 6 y SwiftUI 5?",
        answer: "Sí. Todo el código de este Playbook utiliza las últimas APIs de SwiftUI (incluyendo Observation framework) y está preparado para Swift 6 (Concurrency, Structured Concurrency)."
    },
    {
        question: "¿Necesito experiencia previa en iOS o Swift?",
        answer: "No. El Playbook está diseñado específicamente para ingenieros con una base sólida en Flutter que quieren mapear sus conocimientos actuales a iOS nativo sin perder tiempo en conceptos básicos de programación."
    },
    {
        question: "¿Qué recibo exactamente con mi compra?",
        answer: "Acceso de por vida a todas las secciones teóricas, el laboratorio de componentes UI, las guías de arquitectura avanzada, 50+ preguntas de entrevista senior resueltas y el código fuente completo de la app de ejemplo."
    },
    {
        question: "¿Hay alguna garantía si no me gusta?",
        answer: "Totalmente. Ofrecemos una garantía de satisfacción de 30 días. Si sientes que el contenido no aporta el valor esperado a tu carrera, te devolvemos el 100% de tu inversión sin preguntas."
    },
    {
        question: "¿Es un pago único o suscripción?",
        answer: "Es un pago único. No hay cuotas mensuales. Una vez que compras el Playbook, tienes acceso a todas las actualizaciones futuras de forma gratuita."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto max-w-3xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 italic">Frequently Asked <span className="text-indigo-500">Questions</span></h2>
                    <p className="text-muted-foreground">Everything you need to know before joining 500+ senior developers.</p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className="border border-border rounded-2xl overflow-hidden bg-card/50 transition-all hover:bg-card"
                        >
                            <button
                                className="w-full flex items-center justify-between p-6 text-left"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                <span className="font-bold text-lg">{faq.question}</span>
                                {openIndex === i ? (
                                    <ChevronUp className="h-5 w-5 text-indigo-500" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                            </button>
                            <div className={cn(
                                "px-6 pb-6 text-muted-foreground leading-relaxed transition-all duration-300",
                                openIndex === i ? "block opacity-100" : "hidden opacity-0"
                            )}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
