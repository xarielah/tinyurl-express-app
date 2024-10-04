import express from "express";
const router = express.Router();

router.get("/:redirectId", (req, res) => {
  const { redirectId } = req.params;
  if (!redirectId)
    return res.status(400).send({ message: "Invalid redirect ID" });

  return res.send({ redirectId });
});

export { router as statisticsController };
