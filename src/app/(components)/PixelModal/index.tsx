'use client';
import { useEffect, useCallback } from 'react';

interface PixelModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const PixelModal = ({ isOpen, onClose, title, children }: PixelModalProps) => {
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
        <div
            className="pixel-modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="pixel-modal w-full max-w-4xl mx-4">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b-4 border-[#5c4033]">
                    <h2 className="pixel-title text-sm md:text-lg lg:text-xl text-[#f4d35e]">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="pixel-close"
                        aria-label="Close modal"
                    >
                        X
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>

                {/* Modal Footer */}
                <div className="p-4 md:p-6 border-t-4 border-[#5c4033] flex justify-center">
                    <button
                        onClick={onClose}
                        className="pixel-btn"
                    >
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PixelModal;
