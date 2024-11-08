import { useEffect, useState } from "react";



export const containsDiacritics = (str: string): boolean => {
    return str !== str.normalize('NFD').replace(/\p{M}/gu, '');
}


// Function to generate a random UUID
export const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const getDeviceUUID = () => {
    let uuid = localStorage.getItem("deviceUUID");
    if (!uuid) {
        uuid = generateUUID();
        localStorage.setItem("deviceUUID", uuid);
    }
    return uuid;
}

export function useDebounce(cb:string, delay:number) {
    const [debounceValue, setDebounceValue] = useState(cb);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(cb);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [cb, delay]);
    return debounceValue;
}

export function isColorLight(color:string) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
}

export function generateRandomArray(length: number, min: number, max: number): number[] {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}
  