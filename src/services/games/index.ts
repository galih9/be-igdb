import { Router, Request, Response } from "express";
import { IGDB_API } from "../../types/url/igdb";
import {
  arrayToObject,
  extractImageId,
  extractNames,
  extractVideo,
  extractWebsites,
  generateGameCountQuery,
  generateGameDetailQuery,
  generateGameListQuery,
} from "../../utils/converter";

const router = Router();

// get game info by id
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
        summary: game.summary,
        storyline: game.storyline,
        screenshot: extractImageId(game.screenshots),
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

// get list
router.post("/list", async (req: Request, res: Response) => {
  const payload = req.body;
  const token = req.headers.authorization;
  const clientId = arrayToObject(req.rawHeaders)["Client-ID"];

  if (
    token === null ||
    token === undefined ||
    payload === null ||
    payload === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Missing token, or payload in request body" });
  }

  const bodyPayload = {
    platform: payload.platform,
    pageSize: payload.pageSize,
    currentPage: payload?.currentPage ?? undefined,
    offset: payload?.offset ?? undefined
  };

  try {
    const response = await fetch(`${IGDB_API}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Client-ID": clientId,
        Authorization: `${token}`,
      },
      body: generateGameListQuery(
        bodyPayload.platform,
        bodyPayload.pageSize,
        bodyPayload.currentPage,
        bodyPayload.offset
      ),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error calling external API (fetch):", data);
      return res.status(response.status).json({
        message: "Failed to call external API",
        details: data,
      });
    }
    var resp = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      resp.push({
        id: element.id,
        cover: element?.cover?.image_id ?? "",
        first_release_date: 1523923200,
        genres: extractNames(element.genres),
        name: element.name,
        checksum: element.checksum,
        game_type: element.game_type,
      });
    }

    const getTotal = await fetch(`${IGDB_API}/games/count`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Client-ID": clientId,
        Authorization: `${token}`,
      },
      body: generateGameCountQuery(bodyPayload.platform),
    });
    const r = await getTotal.json();
    const totalItem = r?.count ?? 0;
    const totalPage = r?.count ? Math.ceil(r.count / bodyPayload.pageSize) : 0;
    var result = {
      status: "success",
      code: response.status,
      data: resp,
      pagination: {
        totalPage: Number(totalPage.toFixed(0)),
        currentPage: Number(bodyPayload.currentPage),
        pageSize: Number(bodyPayload.pageSize),
        totalItem: Number(totalItem),
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
