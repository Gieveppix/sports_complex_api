import { Request, Response } from 'express';
// import { validationResult, ValidationError } from 'express-validator';
import { updateReviewService } from '$/src/service/class.service.js';

export async function updateReviewController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await updateReviewService(request.params.id, request.body);

  // const validationResultObject = validationResult(request);
  // const errors = validationResultObject.array();

  // if (errors[0]) {
  //   response.status(422).send(errors[0].msg as ValidationError);
  // } else {
  response.status(res.responseCode).send(res.message);
  // }
}
