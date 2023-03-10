// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import blizzAPI from "../../utils/blizzAPI";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const specMedia = await blizzAPI.query(
		"/data/wow/media/playable-specialization/262?namespace=static-us&locale=en_US"
	);

	res.status(200).send(specMedia);
}
