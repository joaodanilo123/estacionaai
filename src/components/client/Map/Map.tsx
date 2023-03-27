"use client"

import { FunctionComponent, useEffect, useState } from 'react';

export function Map() {
    const [Client, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof global.window !== "undefined") {
                const newClient = (await import('./MapClient')).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    if (typeof global.window === "undefined" || !Client) {
        return null;
    }

    return Client ? <Client /> : null;
}