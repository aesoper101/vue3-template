import CryptoJS from 'crypto-js';

export const useCrypto = () => {
  const key = import.meta.env.VITE_APP_KEY;
  const aesEncrypt = (plaintext: string) => {
    return CryptoJS.AES.encrypt(plaintext, key).toString();
  };

  const aseDecrypt = (ciphertext: string) => {
    return CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
  };

  return { aesEncrypt, aseDecrypt };
};
