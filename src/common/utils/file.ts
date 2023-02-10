import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { DocumentType, MimeTypes } from '../constants';
import { GeneratorProvider } from '../providers';
import * as path from 'path';
const WordExtractor = require("word-extractor");

export function convertFileToBase64(path: string): string {
  try {
    const file = fs.readFileSync(`./${process.env.DOCUMENT_PATH}${path}`);
    return Buffer.from(file).toString('base64');
  } catch (error) {
    throw new BadRequestException(`Can not read file in path: ${path}`)
  }
}

export async function getBase64FileContent(fileBuffer: string): Promise<string> {
  try {
    return Buffer.from(fileBuffer).toString('base64');
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('File can not read');
  }
}

export async function saveFile(file: Express.Multer.File): Promise<{ fileName: string, docType: DocumentType}> {
  let fileName: string = '';
  let docType: DocumentType ;
  const uid = GeneratorProvider.uuid();
  switch(file.mimetype){
    case MimeTypes.PDF:
      fileName = `${uid}.pdf`;
      docType = DocumentType.PDF
      break;
    case MimeTypes.TEXT:
      fileName = `${uid}.txt`;
      docType = DocumentType.TXT;
      break;
    case MimeTypes.DOCX:
      fileName = `${uid}.docx`;
      docType = DocumentType.DOCX;
      break;
    case MimeTypes.DOC:
      fileName = `${uid}.doc`;
      docType = DocumentType.DOC;
      break
    default:
      throw new InternalServerErrorException('File format is not valid');
  }
  if(!fs.existsSync('./upload')){
    fs.mkdirSync('./upload');
  }
  try {
    fs.createWriteStream(`./upload/${fileName}`).write(file.buffer);
    return {fileName, docType};
  } catch (error) {
    throw new InternalServerErrorException('File can not be saved');
  }
}


export function readFilesInFolder(folderPath: string): string[] {
  const files = fs.readdirSync(`./${process.env.DOCUMENT_PATH}${folderPath}`);
  const combinedFilePath: string[] = [];
  if(files) {
    files.forEach(file => {
      combinedFilePath.push(combineFilePath(`./${process.env.DOCUMENT_PATH}${folderPath}`, file))
    })
    return combinedFilePath;
  }
}

export function combineFilePath(dirName: string, fileName: string): string {
  return path.join(dirName, fileName);
}