'use client';
import { useEffect } from "react";

const ScrollIntoView = () => {

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: "start"});
        }
    }, []);
    
    return (null);
}

export default ScrollIntoView