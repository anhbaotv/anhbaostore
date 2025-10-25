
import React, { useRef, useEffect } from 'react';
import type { AppInfo } from '../types';

interface AppCardProps {
    app: AppInfo;
    onSelect: (app: AppInfo) => void;
    onFocus: (appId: string) => void;
    isFocused: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onSelect, onFocus, isFocused }) => {
    const cardRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isFocused && cardRef.current) {
            cardRef.current.focus();
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [isFocused]);

    return (
        <button
            ref={cardRef}
            className="group relative w-[280px] h-[160px] md:w-[300px] md:h-[170px] flex-shrink-0 rounded-lg overflow-hidden bg-[#222] transition-transform duration-300 ease-in-out focus:outline-none focus:scale-110 focus:z-20 focus:shadow-2xl focus:shadow-[#00a8ff]/50"
            onClick={() => onSelect(app)}
            onFocus={() => onFocus(app.id)}
        >
            <img 
                src={app.poster} 
                alt={app.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="font-bold text-white text-center text-base truncate">
                    {app.title}
                </div>
            </div>
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
    );
};
