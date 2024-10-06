// All required import
import express from "express";
import asyncHandler from "express-async-handler";
import { uploadFieldsFile } from "../../middelwares/SupUploadFile";
import sharp from "sharp";

// uploadFieldsFile
export const uploadProductsFile = uploadFieldsFile([
  { name: "coverimg", maxCount: 1 },
  { name: "imgs", maxCount: 5 },
]);

// editFileWithBuffer
export const editFileWithBuffer = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    //

    if (req.files) {
      //
      if (req.files.coverimg) {
        const imgName = `product-${Date.now()}-coverimg.webp`;
        await sharp(req.files.coverimg[0].buffer)
          .resize(500, 500)
          .toFormat("webp")
          .webp({ quality: 95 })
          .toFile(`uploads/products/${imgName}`);
        req.body.coverimg = imgName;
      }
      //
      if (req.files.imgs) {
        req.body.imgs = [];
        await Promise.all(
          req.files.imgs.map(async (image: any, index: number) => {
            const imgName = `product-${Date.now()}N${index}-.webp`;
            await sharp(image.buffer)
              .toFormat("webp")
              .webp({ quality: 95 })
              .toFile(`uploads/products/${imgName}`);
            req.body.imgs.push(imgName);
          })
        );
      }
      //
    }

    //
    next();
  }
);
