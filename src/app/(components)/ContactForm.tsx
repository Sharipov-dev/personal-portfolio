'use client';
import { useState, useRef, useEffect } from 'react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

type FormStatus = 'idle' | 'transmitting' | 'success' | 'error';

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [transmissionProgress, setTransmissionProgress] = useState(0);
    const [activeField, setActiveField] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Transmission animation
    useEffect(() => {
        if (status === 'transmitting') {
            const interval = setInterval(() => {
                setTransmissionProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + Math.random() * 15;
                });
            }, 200);
            return () => clearInterval(interval);
        } else {
            setTransmissionProgress(0);
        }
    }, [status]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('transmitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Transmission failed. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMessage('Connection lost. Please check your signal and try again.');
        }
    };

    const resetForm = () => {
        setStatus('idle');
        setErrorMessage('');
    };

    if (status === 'success') {
        return (
            <div className="transmission-terminal success-state">
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <span className="dot dot-green"></span>
                        <span className="dot dot-green"></span>
                        <span className="dot dot-green"></span>
                    </div>
                    <span className="terminal-title">TRANSMISSION COMPLETE</span>
                </div>
                <div className="terminal-body text-center py-12">
                    <div className="success-icon mb-6">
                        <svg className="w-20 h-20 mx-auto text-[var(--accent-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
                        Message Received!
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6">
                        Your transmission has reached my inbox across the cosmos.
                        <br />I&apos;ll respond faster than light speed!
                    </p>
                    <button
                        onClick={resetForm}
                        className="btn-secondary inline-flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Send Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="transmission-terminal">
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                </div>
                <span className="terminal-title">
                    {status === 'transmitting' ? 'TRANSMITTING...' : 'SPACE TRANSMISSION'}
                </span>
                <div className="signal-indicator">
                    <span className="signal-bar"></span>
                    <span className="signal-bar"></span>
                    <span className="signal-bar"></span>
                </div>
            </div>

            {/* Transmission Progress Bar */}
            {status === 'transmitting' && (
                <div className="transmission-progress">
                    <div
                        className="progress-bar"
                        style={{ width: `${Math.min(transmissionProgress, 100)}%` }}
                    ></div>
                    <span className="progress-text">
                        {Math.min(Math.round(transmissionProgress), 100)}% - Encoding message...
                    </span>
                </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
                <div className="error-banner">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errorMessage}
                </div>
            )}

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="terminal-body">
                <div className="form-grid">
                    {/* Name Field */}
                    <div className={`form-field ${activeField === 'name' ? 'active' : ''} ${formData.name ? 'filled' : ''}`}>
                        <label htmlFor="name" className="field-label">
                            <span className="label-prefix">&gt;</span> IDENTIFICATION
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setActiveField('name')}
                            onBlur={() => setActiveField(null)}
                            required
                            disabled={status === 'transmitting'}
                            placeholder="Your name"
                            className="form-input"
                        />
                        <div className="field-underline"></div>
                    </div>

                    {/* Email Field */}
                    <div className={`form-field ${activeField === 'email' ? 'active' : ''} ${formData.email ? 'filled' : ''}`}>
                        <label htmlFor="email" className="field-label">
                            <span className="label-prefix">&gt;</span> FREQUENCY
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setActiveField('email')}
                            onBlur={() => setActiveField(null)}
                            required
                            disabled={status === 'transmitting'}
                            placeholder="your.email@cosmos.com"
                            className="form-input"
                        />
                        <div className="field-underline"></div>
                    </div>
                </div>

                {/* Subject Field */}
                <div className={`form-field full-width ${activeField === 'subject' ? 'active' : ''} ${formData.subject ? 'filled' : ''}`}>
                    <label htmlFor="subject" className="field-label">
                        <span className="label-prefix">&gt;</span> SUBJECT LINE
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setActiveField('subject')}
                        onBlur={() => setActiveField(null)}
                        required
                        disabled={status === 'transmitting'}
                        placeholder="What's this transmission about?"
                        className="form-input"
                    />
                    <div className="field-underline"></div>
                </div>

                {/* Message Field */}
                <div className={`form-field full-width ${activeField === 'message' ? 'active' : ''} ${formData.message ? 'filled' : ''}`}>
                    <label htmlFor="message" className="field-label">
                        <span className="label-prefix">&gt;</span> MESSAGE PAYLOAD
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setActiveField('message')}
                        onBlur={() => setActiveField(null)}
                        required
                        disabled={status === 'transmitting'}
                        placeholder="Type your message here... The cosmos is listening."
                        rows={5}
                        className="form-input form-textarea"
                    />
                    <div className="field-underline"></div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === 'transmitting'}
                    className="transmit-button"
                >
                    {status === 'transmitting' ? (
                        <>
                            <span className="transmit-loader"></span>
                            Transmitting...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Launch Transmission
                        </>
                    )}
                </button>
            </form>

            {/* Decorative Elements */}
            <div className="terminal-scanline"></div>
        </div>
    );
};

export default ContactForm;
