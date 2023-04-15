import { FormEvent, useState } from "react";

export function useFormSubmission(url: string, method: string, acceptStatus: number) {

    const [loading, setLoading] = useState(false);
    const [responseError, setResponseError] = useState(false);
    const [responseData, setResponseData] = useState<any>({});

    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        setLoading(true);

        const form = ev.target as HTMLFormElement;
        const formData = new FormData(form);

        try {

            const fetchOptions: any = {
                body: formData,
                method: method
            }

            if(method != "GET") fetchOptions["Content-Type"] = "application/json";

            const response = await fetch(url, fetchOptions);

            if (response?.status !== acceptStatus) {
                setResponseError(true);
            }

            setResponseData(await response.json());

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        responseData,
        loading,
        responseError,
        handleFormSubmit
    };
}