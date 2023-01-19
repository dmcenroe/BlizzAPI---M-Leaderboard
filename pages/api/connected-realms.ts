// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import blizzAPI from "../../utils/blizzAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connectedRealmList = await blizzAPI.query(
    "/data/wow/search/connected-realm?namespace=dynamic-us&orderby=id"
  );

  res.status(200).send(connectedRealmList);
}
