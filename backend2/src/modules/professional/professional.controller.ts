import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import httpStatus from "http-status";
import { ProfessionalService } from "./professional.service";

const createProfessional = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.body;
    const result = await ProfessionalService.createProfessional(params);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "data fetched successfully",
      data: result,
    });
  }
);


export const ProfessionalsController = {
  createProfessional,
};
