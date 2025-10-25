
import React from 'react';
import { AppCard } from './AppCard';
import type { AppInfo, RowData } from '../types';

interface AppRowProps {
    row: RowData;
    onSelectApp: (app: AppInfo) => void;
    onFocusApp: (appId: string) => void;
    focusedAppId: string | null;
}

export const AppRow: React.FC<AppRowProps> = ({ row, onSelectApp, onFocusApp, focusedAppId }) => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#00a8ff] ml-2">
                {row.title}
            </h2>
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-3 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                {row.apps.map(app => (
                    <AppCard
                        key={app.id}
                        app={app}
                        onSelect={onSelectApp}
                        onFocus={onFocusApp}
                        isFocused={app.id === focusedAppId}
                    />
                ))}
            </div>
        </div>
    );
};
