import React, { useEffect, useState } from 'react'
import { ToastItem, toastStore } from './toastStore';

const ToastProvider = () => {
    const [toastlist, setToastList] = useState<ToastItem[]>([]);
    const handleRemove = (id: string) => toastStore.remove(id);

    useEffect(() => {
        const unsubscribe = toastStore.subscribe(setToastList);
        return () => unsubscribe();
    }, []);

    return (
        <div className='fixed top-6 right-6 z-50 pointer-events-none flex flex-col gap-3 items-end'>
            {toastlist.map((item) => (<ToastCardItem key={item.id} {...item} handleRemove={() => handleRemove(item.id)} />))}
        </div>
    )
}

export default ToastProvider

const ToastCardItem = ({ id, content, handleRemove }: ToastItem & { handleRemove: () => void }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            handleRemove();
        }, 2000);
        return () => clearTimeout(timer);
    }, [id]);

    return (
        <>
            {content}
        </>
    );
}
