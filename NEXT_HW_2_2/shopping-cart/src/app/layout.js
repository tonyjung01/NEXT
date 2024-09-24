'use client';
import React from 'react';
import { CartProvider } from '../context/CartContext';
import '../styles/index.css'; 
import '../styles/reset.css';
import '../styles/fonts.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <CartProvider>{children}</CartProvider>
            </body>
        </html>
    );
}
