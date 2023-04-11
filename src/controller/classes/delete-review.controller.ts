import { Request, Response } from 'express';
import { deleteReviewService } from '../../service/class.service.js';

export async function deleteReviewController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await deleteReviewService(request.params.id);

  response.status(res.responseCode).send(res.message);
}
