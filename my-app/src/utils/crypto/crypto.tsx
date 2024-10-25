import CryptoJS from 'crypto-js';

export const encryptPassword = (password: string): string => {
  console.log(`Hashing password: ${password}`);
  return CryptoJS.AES.encrypt(password, 'secret-key').toString();
};

export const decryptPassword = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret-key');
  return bytes.toString(CryptoJS.enc.Utf8);
};
