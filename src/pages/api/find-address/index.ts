import { NextApiRequest, NextApiResponse } from "next";

interface HttpGetHandlerCoordinates {
    x: number,
    y: number
}

interface NominatimAddress {
    road: string,
    suburb: string,
    town: string,
    state: string 
}

function parseAddress(address: NominatimAddress){

    const road = address.road;


}

const handlers = {

    async get(res: NextApiResponse, coordinates: HttpGetHandlerCoordinates) {

        const URL = `https://nominatim.openstreetmap.org/reverse?lon=${coordinates.x}&lat=${coordinates.y}&format=json`;

        const response = await (await fetch(URL)).json();
        
        parseAddress(response.address)

        res.json(response.address);
        res.end();

    }

}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const x = Number(req.query.x);
    const y = Number(req.query.y);

    if (isNaN(x) || isNaN(y)) {
        res.status(400).json({ "message": "params x and y must be numbers" });
    }

    if (req.method === "GET") {
        await handlers.get(res, {x, y});
    }

    if (req.method === "undefined" || req.method === null) {
        res.status(400).json({ "message": "method not defined" });
    }

}