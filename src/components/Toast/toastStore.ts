import { ReactNode } from "react";

export type ToastItem = {
    id:string;
    content:ReactNode;
}
type Listener = (item:ToastItem[])=>void;

let  list:ToastItem[] = [];
let listeners:Listener[] = [];

export const toastStore = {
    subscribe(listener:Listener){
        listeners.push(listener);
        listener(list);
        return ()=>{
            listeners =  listeners.filter((item)=> item !== listener);
        }
    },
    notify(){
        listeners.forEach((fn)=>fn(list));
    },
    add(content:ReactNode){
       const id = crypto.randomUUID();
       list = [...list, {id:id,content:content}];
       this.notify(); 
    },
    remove(id:string){
        const _items  = list.filter((item)=> item.id !== id);
        list = _items;
        this.notify();
    }
}
