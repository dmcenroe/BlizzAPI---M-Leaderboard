// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import blizzAPI from "../../utils/blizzAPI";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const dungeonList = await blizzAPI.query(
		"/data/wow/connected-realm/11/mythic-leaderboard/index?namespace=dynamic-us&locale=en_US"
	);

	res.status(200).send(dungeonList);
}
