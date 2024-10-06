// All required import
import express from "express";
import asyncHandler from "express-async-handler";
import { uploadSingleFile } from "../../middelwares/SupUploadFile";
import sharp from "sharp";

// uploadFieldsFile
export const uploadCategoryFile = uploadSingleFile("img");

// editFileWithBuffer
export const editFileWithBuffer = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    //

    if (req.file) {
      const imgName = `category-${Date.now()}.webp`;
      await sharp(req.file.buffer)
        .toFormat("webp")
        .webp({ quality: 95 })
        .toFile(`uploads/categories/${imgName}`);
      req.body.img = imgName;
    }

    //
    next();
  }
);
