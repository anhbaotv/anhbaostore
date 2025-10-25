
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#111] border-t-2 border-gray-800 text-center p-4 text-sm text-gray-400">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 mb-2">
                 <p>Liên hệ: <a href="mailto:anhbao.store@gmail.com" className="text-[#00a8ff] hover:underline">anhbao.store@gmail.com</a></p>
                 <p>Hotline: <a href="tel:+84987654321" className="text-[#00a8ff] hover:underline">+84 987 654 321</a></p>
            </div>
            <p>© 2025 ANHBAO Store. Mọi quyền được bảo lưu.</p>
        </footer>
    );
};