'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: 'Who do you serve?',
        answer: 'Java Global Access Platform FZ-LLC delivers professional and technology-enabled services exclusively to overseas clients. All work is structured for cross-border delivery and export orientation.',
    },
    {
        question: 'Do you provide services to local Sri Lankan clients?',
        answer: 'No. The platform is strictly export-oriented and does not engage in domestic market service activities.',
    },
    {
        question: 'Where is service delivery performed?',
        answer: 'Execution and delivery functions are centralized through the Sri Lanka-based operation, operating as a global delivery and execution hub under centralized governance and reporting.',
    },
    {
        question: 'What is your service model?',
        answer: (
            <div className="space-y-4">
                <p>We operate a hybrid export services model that integrates:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <strong>Professional Services</strong> for remote advisory, analytical, coordination, and structured consulting support.
                    </li>
                    <li>
                        <strong>Managed Services</strong> for continuous operational support delivered through dedicated teams under defined service frameworks.
                    </li>
                </ul>
            </div>
        ),
    },
    {
        question: 'What types of services do you provide?',
        answer: (
            <div className="space-y-4">
                <p>Services are aligned with international market requirements and typically include:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Business and operational process support</li>
                    <li>Network and systems coordination services</li>
                    <li>Technology consulting and documentation support</li>
                    <li>Social media application development and operational management support</li>
                    <li>Data handling, validation, and structured processing services</li>
                </ul>
                <p>
                    Digital systems and automation tools are used internally to ensure workflow consistency, quality control, and reporting accuracy.
                </p>
            </div>
        ),
    },
    {
        question: 'How does an engagement start?',
        answer: (
            <div className="space-y-4">
                <p>Each engagement follows a structured lifecycle:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Engagement scoping</li>
                    <li>Resource planning</li>
                    <li>Execution and supervision</li>
                    <li>Performance monitoring</li>
                    <li>Continuous improvement</li>
                </ul>
            </div>
        ),
    },
    {
        question: 'What information do you need to scope a project?',
        answer: (
            <div className="space-y-4">
                <p>To scope an engagement, share:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Required service type and scope summary</li>
                    <li>Expected outcomes</li>
                    <li>Timeline requirements</li>
                    <li>Reporting, monitoring, or compliance expectations</li>
                    <li>Any operational constraints or security requirements</li>
                </ul>
            </div>
        ),
    },
    {
        question: 'How do you ensure control and continuity?',
        answer: (
            <div className="space-y-4">
                <p>Delivery is designed around:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Standardized workflows and documented processes</li>
                    <li>Centralized quality assurance</li>
                    <li>Defined escalation and reporting mechanisms</li>
                    <li>Secure digital infrastructure and structured reporting</li>
                    <li>Group-aligned oversight mechanisms</li>
                </ul>
            </div>
        ),
    },
    {
        question: 'How do you handle data and information security?',
        answer: 'Data handling is managed through controlled workflows, secure systems, and access governance appropriate for cross-border service delivery. Security practices are applied through internal protocols and operational monitoring, aligned to contractual requirements.',
    },
    {
        question: 'Do you offer SLAs and structured reporting?',
        answer: 'Yes, where required. Reporting cadence, performance measures, and escalation paths are typically defined during engagement scoping and formalized within service frameworks.',
    },
    {
        question: 'Can you scale delivery teams as requirements change?',
        answer: 'Scaling is supported through structured resource planning and standardized delivery frameworks. Capacity changes are managed through defined approvals and governance mechanisms.',
    },
    {
        question: 'What is the relationship to the parent company?',
        answer: 'Java Global Access Platform FZ-LLC operates within a group-aligned framework where strategic oversight, service standards, and market engagement are guided by the parent company, while delivery execution and monitoring are centralized within the Sri Lankan operation.',
    },
    {
        question: 'Do you provide technology products for sale?',
        answer: 'No. Technology is deployed as an internal capability to strengthen operational control and service consistency. These internal capabilities support delivery but are not positioned as independent revenue products.',
    },
    {
        question: 'How do we contact you to start?',
        answer: 'Use the contact form to share your requirements for engagement scoping. You can also reach us via phone or email for contractual discussions and service coordination.',
    },
];

export default function FAQ() {
    return (
        <section className="py-24 bg-white text-black">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                {/* Left Column: Sticky Header & Description */}
                <div className="lg:col-span-5 lg:sticky lg:top-[35vh] h-fit mb-12 lg:mb-0">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <h2 className="text-sm font-medium tracking-wide text-gray-800 uppercase">
                            FAQ
                        </h2>
                    </div>

                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
                        Common Questions
                    </h3>

                    <p className="text-xl text-gray-500 leading-relaxed">
                        Find quick answers about our export-oriented delivery model, service scope, governance, and engagement process. If you need scoping support, contact us to request a service discussion.
                    </p>
                </div>

                {/* Right Column: Scrollable Accordion */}
                <div className="lg:col-span-7">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
                                <AccordionTrigger className="text-left text-lg sm:text-xl font-medium py-6 hover:text-blue-600 hover:no-underline transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base sm:text-lg leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
