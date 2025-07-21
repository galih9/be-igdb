import { Router, Request, Response } from "express";
import { IGDB_API } from "../../types/url/igdb";
import { arrayToObject, extractImageId, extractNames, extractVideo, extractWebsites, generateGameDetailQuery } from "../../utils/converter";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const gameId = req.body?.id;
  const token = req.headers.authorization;
  const clientId = arrayToObject(req.rawHeaders)["Client-ID"];

  if (
    token === null ||
    token === undefined ||
    gameId === null ||
    gameId === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Missing token, or payload in request body" });
  }

  try {
    const response = await fetch(`${IGDB_API}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Client-ID": clientId,
        Authorization: `${token}`,
      },
      body: generateGameDetailQuery(gameId),
    });

    const data = await response.json();
    // console.log(generateGameDetailQuery(payload?.id))

    if (!response.ok) {
      console.error("Error calling external API (fetch):", data);
      return res.status(response.status).json({
        message: "Failed to call external API",
        details: data,
      });
    }

    const game = data[0];
    var result = {
      status: "success",
      code: response.status,
      data: {
        name: game.name,
        artworks: extractImageId(game.artworks),
        cover: game.cover.image_id,
        genres: extractNames(game.genres),
        videos: extractVideo(game.videos),
        websites: extractWebsites(game.websites),
        summary: game.summary
      },
    };

    res.status(response.status).json(result);
  } catch (error: any) {
    console.error("Unexpected error (fetch):", error);
    res.status(500).json({
      message: "An unexpected error occurred",
      details: error.message,
    });
  }
});

export default router;
