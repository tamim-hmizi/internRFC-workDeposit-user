import AWS from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';

const s3 = new AWS.S3();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ error: 'Failed to upload file' });
      return;
    }

    const file = files.Fichier; // Access the 'Fichier' field from formidable
    if (!file) {
      console.error('No file received');
      res.status(400).json({ error: 'No file received' });
      return;
    }

    const fileName = file.name;
    const fileContent = fs.readFileSync(file.path);

    const params = {
      Bucket: 'internrfc-bucket', // Replace with your S3 bucket name
      Key: fileName,
      Body: fileContent,
    };

    try {
      const data = await s3.upload(params).promise();
      console.log('File uploaded successfully:', data.Location);
      res.status(200).json({ message: 'File uploaded successfully', fileUrl: data.Location });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
}
