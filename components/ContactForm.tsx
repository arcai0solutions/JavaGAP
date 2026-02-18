'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Email template parameters for EmailJS
            const emailParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
            };

            // Run both EmailJS and Supabase submissions in parallel
            const [emailResult, inquiryResult] = await Promise.allSettled([
                // 1. Send email via EmailJS
                emailjs.send(
                    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
                    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
                    emailParams,
                    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
                ),
                // 2. Insert into Supabase Inquiries
                supabase
                    .from('inquiries')
                    .insert([
                        {
                            name: formData.name,
                            email: formData.email,
                            subject: formData.subject,
                            message: formData.message,
                            status: 'new'
                        }
                    ])
            ]);

            // Check Supabase result
            if (inquiryResult.status === 'fulfilled' && inquiryResult.value.error) {
                throw inquiryResult.value.error;
            }

            // Log email result but don't fail the form
            if (emailResult.status === 'rejected') {
                console.error('EmailJS error:', emailResult.reason);
            }

            // 3. Check and Insert into Contacts
            const { data: existingContact } = await supabase
                .from('contacts')
                .select('id')
                .eq('email', formData.email)
                .single();

            if (!existingContact) {
                await supabase.from('contacts').insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        source: 'website'
                    }
                ]);
            }

            setSubmittedName(formData.name.split(' ')[0]);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 space-y-6 animate-in fade-in duration-500">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-gray-900">
                        Thank you{submittedName ? `, ${submittedName}` : ''}!
                    </h3>
                    <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                        Your message has been received. Our team will review your inquiry and get back to you within <strong>24 hours</strong>.
                    </p>
                </div>
                <div className="pt-4">
                    <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="rounded-full px-6 py-5 text-base gap-2 hover:bg-gray-50 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Send another message
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus:border-black/50"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus:border-black/50"
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus:border-black/50"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 focus:border-black/50 resize-y"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-6 bg-black hover:bg-black/90 text-white rounded-full text-lg transition-transform hover:scale-105 duration-300 flex items-center justify-center gap-2 group"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </Button>
        </form>
    );
}
