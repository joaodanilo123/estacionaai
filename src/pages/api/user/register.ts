import { NextApiRequest, NextApiResponse } from "next";
import { register } from "../../../services/User/register";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const newUser = req.body;
  
    const userId = await register(newUser);
  
    if (typeof userId === 'string') {
      return res.status(400).json({ message: userId });
    }
  
    return res.status(200).json({ userId });
}

