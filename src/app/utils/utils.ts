export function openSidebar() {
    if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    }
}

export function closeSidebar() {
    if (typeof window !== 'undefined') {
        document.documentElement.style.removeProperty('--SideNavigation-slideIn');
        document.body.style.removeProperty('overflow');
    }
}

export function toggleSidebar() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const slideIn = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--SideNavigation-slideIn');
        if (slideIn) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
}


export function openMessagesPane() {
    if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.setProperty('--MessagesPane-slideIn', '1');
    }
}

export function closeMessagesPane() {
    if (typeof window !== 'undefined') {
        document.documentElement.style.removeProperty('--MessagesPane-slideIn');
        document.body.style.removeProperty('overflow');
    }
}

export function toggleMessagesPane() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const slideIn = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--MessagesPane-slideIn');
        if (slideIn) {
            closeMessagesPane();
        } else {
            openMessagesPane();
        }
    }
}


export const createPagination = (from: number, to: number) => Array.from({length:to - from + 1},(_, i) => {
        
    if((to - from) > 10){
        return i == Math.ceil((to - from)/2) ? "...": from + i
    }else{
        return from + i
    }
   
});


export const containsDiacritics = (str: string): boolean => {
    return str !== str.normalize('NFD').replace(/\p{M}/gu, '');
}
