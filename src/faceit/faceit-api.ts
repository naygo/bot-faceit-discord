import { FaceitHubMatches } from "@/models/interfaces/faceit";
import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()


export const faceitClient = axios.create({
  baseURL: "https://open.faceit.com/data/v4",
  headers: {
    Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
  },
})

export async function getHubMatches(hubId: string): Promise<FaceitHubMatches> {
  const response = await faceitClient.get(`/hubs/${hubId}/matches`, {
    params: {
      limit: 10,
      offset: 0,
      type: 'ongoing'
    },
  });

  return response.data;
}