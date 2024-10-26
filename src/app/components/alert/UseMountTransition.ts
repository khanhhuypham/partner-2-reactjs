import { useState,useEffect } from "react";



const useMountTransition = (isMounted:boolean, unmountDelay:number) => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

    useEffect(() => {
        let timeoutId: string | number | NodeJS.Timeout | undefined;

        if (isMounted && !hasTransitionedIn) {
            setHasTransitionedIn(true);
        } else if (!isMounted && hasTransitionedIn) {
            timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [unmountDelay, isMounted, hasTransitionedIn]);

    return hasTransitionedIn;
};

export default useMountTransition;
