// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import blizzAPI from "../../../utils/blizzAPI";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { slug } = req.query;
	const dungeonId = slug[1];
	const connRealmId = slug[0];

	const leaderBoard = await blizzAPI.query(
		`/data/wow/connected-realm/${connRealmId}/mythic-leaderboard/${dungeonId}/period/887?namespace=dynamic-us&locale=en_US`
	);

	res.status(200).send(leaderBoard);
}