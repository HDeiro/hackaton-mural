import { Request, Response } from "express";
import { fetchStickyNotes } from "../service/mural-api.service";
import { ErrorService, ValidationError } from "../service/error.service";

/**
 * Fetch a single page of sticky notes in a mural.
 */
export const translate = async (req: Request, res: Response) => {
  const { muralId } = req.params;

  if (!muralId) {
    throw new ValidationError(`A valid muralId is required for this api.`);
  }

  try {
    const stickyNotes = await fetchStickyNotes(muralId);
    res.status(200).json(stickyNotes);
  } catch (error) {
    ErrorService.errorHandler(error, res);
  }
};
