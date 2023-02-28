// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import blizzAPI from "../../../utils/blizzAPI";

export default async function handler(req, res) {
  const { slug } = req.query;
  const dungeonId = slug[1];
  const connRealmId = slug[0];

  const leaderBoard = await blizzAPI.query(
    `/data/wow/connected-realm/${connRealmId}/mythic-leaderboard/${dungeonId}/period/890?namespace=dynamic-us&locale=en_US`
  );

  res.status(200).send(leaderBoard);
}
