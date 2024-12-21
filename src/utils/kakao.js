// utils/kakao.js

import { init, login } from '@kakao/kakao-js-sdk';

export const initKakao = () => {
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('YOUR_JAVASCRIPT_KEY'); // Thay 'YOUR_JAVASCRIPT_KEY' bằng JavaScript Key của bạn
  }
};

export const loginWithKakao = () => {
  return new Promise((resolve, reject) => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            resolve(res);
          },
          fail: (error) => {
            reject(error);
          },
        });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
