"use client";

import React, { useEffect } from 'react';

// Extend the Window interface to include adsbygoogle
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

const AdsComponent: React.FC<{ dataAdSlot: string }> = ({ dataAdSlot }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("Adsbygoogle error:", e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-8201720283335151"
            data-ad-slot={dataAdSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
};

export default AdsComponent;
