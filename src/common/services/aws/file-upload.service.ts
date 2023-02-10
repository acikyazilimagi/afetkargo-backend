import { Req, Res, Injectable } from '@nestjs/common';
import * as S3 from 'aws-sdk/clients/s3'
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileUploadService {
  private s3: S3;
  constructor(
    
  ) {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    
    

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Body: file.buffer,
      Key: uuid() + '.' + file.mimetype.split('/')[1],
    };

    console.log("check params",params);

    const response = await this.s3.upload(params).promise();
    return response.Location;
  }
}
