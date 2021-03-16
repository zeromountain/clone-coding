import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import App from './layouts/App';

render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
  document.querySelector('#app'));  


// pages - SPA의 각 페이지 (회원가입, 로그인, 워크스페이스페이지, 채널페이지...)
// components - 공통되거나 페이지들의 자잘한 컴포넌트들
// layouts - 공통 레이아웃