
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { AppRow } from './components/AppRow';
import { DetailsModal } from './components/DetailsModal';
import { Footer } from './components/Footer';
import { loadAppData } from './services/dataService';
import type { AppInfo, RowData } from './types';

const App: React.FC = () => {
    const [rows, setRows] = useState<RowData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
    const [focusedAppId, setFocusedAppId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await loadAppData();
            setRows(data);
            if (data.length > 0 && data[0].apps.length > 0) {
                setFocusedAppId(data[0].apps[0].id);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const filteredRows = useMemo(() => {
        if (!searchQuery) {
            return rows;
        }
        const lowercasedQuery = searchQuery.toLowerCase();
        return rows
            .map(row => ({
                ...row,
                apps: row.apps.filter(app =>
                    app.title.toLowerCase().includes(lowercasedQuery)
                ),
            }))
            .filter(row => row.apps.length > 0);
    }, [rows, searchQuery]);

    const allVisibleApps = useMemo(() => {
        return filteredRows.flatMap(row => row.apps);
    }, [filteredRows]);
    
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!allVisibleApps.length || selectedApp) return;

        let currentFocusIndex = allVisibleApps.findIndex(app => app.id === focusedAppId);
        if (currentFocusIndex === -1 && allVisibleApps.length > 0) {
            currentFocusIndex = 0;
            setFocusedAppId(allVisibleApps[0].id);
        }
        
        let nextFocusIndex = currentFocusIndex;
        
        const currentRowIndex = filteredRows.findIndex(row => row.apps.some(app => app.id === focusedAppId));
        if (currentRowIndex === -1) return;

        const currentAppIndexInRow = filteredRows[currentRowIndex].apps.findIndex(app => app.id === focusedAppId);


        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                if (currentAppIndexInRow < filteredRows[currentRowIndex].apps.length - 1) {
                    setFocusedAppId(filteredRows[currentRowIndex].apps[currentAppIndexInRow + 1].id);
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                 if (currentAppIndexInRow > 0) {
                    setFocusedAppId(filteredRows[currentRowIndex].apps[currentAppIndexInRow - 1].id);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (currentRowIndex < filteredRows.length - 1) {
                    const nextRow = filteredRows[currentRowIndex + 1];
                    const nextAppIndex = Math.min(currentAppIndexInRow, nextRow.apps.length - 1);
                    setFocusedAppId(nextRow.apps[nextAppIndex].id);
                }
                break;
            case 'ArrowUp':
                 e.preventDefault();
                if (currentRowIndex > 0) {
                    const prevRow = filteredRows[currentRowIndex - 1];
                    const nextAppIndex = Math.min(currentAppIndexInRow, prevRow.apps.length - 1);
                    setFocusedAppId(prevRow.apps[nextAppIndex].id);
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedAppId) {
                    const appToSelect = allVisibleApps.find(app => app.id === focusedAppId);
                    if (appToSelect) setSelectedApp(appToSelect);
                }
                break;
            case 'Escape':
                e.preventDefault();
                if (selectedApp) {
                    setSelectedApp(null);
                }
                break;
        }
    }, [allVisibleApps, focusedAppId, selectedApp, filteredRows]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (!searchQuery && rows.length > 0 && rows[0].apps.length > 0 && !focusedAppId) {
             setFocusedAppId(rows[0].apps[0].id);
        } else if (searchQuery && filteredRows.length > 0 && filteredRows[0].apps.length > 0) {
            const currentFocusedIsVisible = allVisibleApps.some(app => app.id === focusedAppId);
            if (!currentFocusedIsVisible) {
                setFocusedAppId(filteredRows[0].apps[0].id);
            }
        }
    }, [searchQuery, filteredRows, rows, focusedAppId, allVisibleApps]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] font-sans flex flex-col">
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <main className="flex-grow p-4 md:p-6 lg:p-8 flex flex-col gap-8">
                {isLoading ? (
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-xl text-gray-400">Đang tải ứng dụng...</p>
                    </div>
                ) : filteredRows.length > 0 ? (
                    filteredRows.map(row => (
                        <AppRow
                            key={row.title}
                            row={row}
                            onSelectApp={setSelectedApp}
                            onFocusApp={setFocusedAppId}
                            focusedAppId={focusedAppId}
                        />
                    ))
                ) : (
                     <div className="flex-grow flex items-center justify-center">
                        <p className="text-xl text-gray-400">Không tìm thấy ứng dụng nào cho "{searchQuery}"</p>
                    </div>
                )}
            </main>

            <Footer />
            
            <DetailsModal app={selectedApp} onClose={() => setSelectedApp(null)} />
        </div>
    );
};

export default App;