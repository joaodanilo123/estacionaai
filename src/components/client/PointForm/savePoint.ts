import { Point } from "@prisma/client";

interface handleSubmitParams {
    Xpos: string,
    Ypos: string,
    address: string
}


export const savePoint = async ({Xpos, Ypos, address} : handleSubmitParams) => {

    const formData = {
        Xpos,
        Ypos,
        address,
        cashier: 0
    }

    const response = await fetch("/api/points", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.status == 201) {
        
        const point: Point = {
            id: Number(response.body),
            ...formData
        }

        return point;
    } else return Error();

}