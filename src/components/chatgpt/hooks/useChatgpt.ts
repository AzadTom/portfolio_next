import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";


export const useChatGpt = (onSend: (message: string) => void) => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const editableRef = useRef<HTMLTextAreaElement | null>(null);
    const measureRef = useRef<HTMLSpanElement | null>(null);


    const [isExpanded, setIsExpanded] = useState(false);
    const [message, setMessage] = useState('');

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMessage(value);
    };

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.target;
        const value = el.value;

        // Dynamic auto-height logic
        requestAnimationFrame(() => {
            const style = getComputedStyle(el);
            const lineHeight = parseFloat(style.lineHeight);
            const minHeight = lineHeight * 1; // start at 1 line
            const maxHeight = lineHeight * 3; // max 3 lines

            el.style.height = 'auto'; // reset
            const newHeight = Math.min(el.scrollHeight, maxHeight);
            el.style.height = `${Math.max(newHeight, minHeight)}px`;
            el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
        });

        setMessage(value);

        // If user clears all text → go back to input
        if (!value.trim()) {
            setIsExpanded(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSend?.(message);
        setMessage('');
        setIsExpanded(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };


    useEffect(() => {
        if (!inputRef.current || !measureRef.current) return;
        if (isExpanded) return;
        measureRef.current.textContent = message || ' ';
        const textWidth = measureRef.current.getBoundingClientRect().width;
        const inputWidth = inputRef.current.getBoundingClientRect().width;

        if (textWidth >= inputWidth - 20) {
            setIsExpanded(true);
            setTimeout(() => {
                if (editableRef.current) {
                    const el = editableRef.current;
                    el.focus();
                    const length = el.textLength;
                    el.setSelectionRange(length, length)
                }
            }, 0);
        }
    }, [message, isExpanded]);


    return {
        message,
        inputRef,
        editableRef,
        measureRef,
        isExpanded,
        handleOnChange,
        handleTextAreaChange,
        handleSubmit
    }

}