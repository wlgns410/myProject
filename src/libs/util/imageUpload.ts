import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://kr.object.ncloudstorage.com'),
  region: process.env.IMAGE_REGION,
  accessKeyId: process.env.IMAGE_ACCESSKEY,
  secretAccessKey: process.env.IMAGE_SECRETACCESSKEY,
});

const imageUpload = async (buffer) => {
  try {
    const imageName = uuidv4(); // Generate a random image name

    await s3
      .putObject({
        Bucket: process.env.IMAGE_BUCKET,
        Key: `${imageName}.PNG`,
        ACL: 'public-read',
        Body: buffer,
        ContentType: 'image/png',
      })
      .promise();

    const imageLink = `${process.env.IMAGE_ENDPOINT}/${process.env.IMAGE_BUCKET}/${imageName}.PNG`;

    return imageLink;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new ErrorResponse(ERROR_CODE.NOT_FOUND_OBJECT_IMAGE);
  }
};

export default imageUpload;
