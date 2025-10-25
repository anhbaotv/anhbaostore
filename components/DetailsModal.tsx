
import React, { useEffect } from 'react';
import type { AppInfo } from '../types';

interface DetailsModalProps {
    app: AppInfo | null;
    onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ app, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!app) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div 
                className="bg-[#111] border-2 border-gray-800 rounded-xl shadow-2xl p-6 md:p-8 max-w-3xl w-full flex flex-col md:flex-row gap-6 md:gap-8 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={app.poster} 
                    alt={app.title} 
                    className="w-full md:w-80 h-48 object-cover rounded-lg border-2 border-[#00a8ff]"
                />
                <div className="flex-1 flex flex-col gap-3">
                    <h2 className="text-3xl font-bold text-[#00a8ff]">{app.title}</h2>
                    <p className="text-lg text-gray-400 font-semibold">{app.dev}</p>
                    <p className="text-base text-gray-300 flex-grow">
                        {app.desc || `Một ứng dụng tuyệt vời cho TV của bạn.`}
                    </p>
                    <a 
                        href={app.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4 bg-[#00a8ff] text-black font-bold py-3 px-6 rounded-lg text-center text-lg hover:brightness-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#00a8ff]/50"
                    >
                        Cài đặt
                    </a>
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};