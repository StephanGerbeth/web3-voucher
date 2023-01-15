import { Buffer } from 'buffer';

export const bufferToString = (buffer, type = 'utf-8') => {
  return Buffer.from(buffer).toString(type);
};

export const stringToBuffer = (string, type = 'utf-8') => {
  return Buffer.from(string, type);
};

export const base64BufferToString = (buffer, type = 'base64') => {
  return bufferToString(buffer, type);
};

export const stringToBase64Buffer = (string, type='base64') => {
  return stringToBuffer(string, type);
};

export const bufferToJSON = (buffer) => {
  return JSON.parse(bufferToString(buffer));
};

export const base64BufferToJSON = (buffer) => {
  return JSON.parse(base64BufferToString(buffer, null));
};
