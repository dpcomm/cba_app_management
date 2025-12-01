import request from './request';

export const requestLogin = (userId: string, password: string, autoLogin: boolean) => {
  return request.post('/api/user/login', {
    userId,
    password,
    autoLogin,
  });
};

export const requestLogout = (id: number | null) => {
  return request.post('/api/user/logout', {
    id
  });
};

export const requestRegister =
(
  userId: string,
  password: string,
  name: string,
  group: string,
  phone: string,
  birth: string,
  gender: string,
  etcGroup?: string
) => {
  return request.post('/api/user/register', {
    userId,
    password,
    name,
    group,
    phone,
    birth,
    gender,
    etcGroup
  });
};

export const updateUserInfo = (
  userId: string,
  name: string,
  // password: string,
  gender: string,
  phone: string,
  group: string,
  birth: string
) => {
  return request.post('/api/user/update', {
    userId,
    name,
    // password,
    gender,
    phone,
    group,
    birth,
  });
};


export const requestRefresh = (accessToken: string | null, refreshToken: string | null) => {
  return request.post('/api/user/refresh', {
    accessToken,
    refreshToken
  });
};

export const requestAuthCheck = (accessToken: string | null, refreshToken: string | null) => {
  return request.post('/api/user', {
    accessToken,
    refreshToken
  });
};

export const requestOriginApplication = (userId?: string | null) => {
  if (userId) {
    return request.get(`/api/application/${userId}`);
  }
  return request.get(`/api/application/originManagement`);
};

export const requestApplication = (userId?: string | null) => {
  if (userId) {
    return request.get(`/api/application/${userId}`);
  }
  return request.get(`/api/application/management`);
};

export const requestApplicationRegister = (
  userId: string | null,
  meal: number[][],
  transfer: string,
  bus?: number[],
  carId?: string
) => {
  return request.post('/api/application', {
    userId,
    meal,
    transfer,
    bus,
    carId
  });
};

export const requestUser = (userId?: string | null) => {
  if (userId) {
    return request.get(`/api/user/${userId}`);
  }
  return request.get(`/api/user`);
};

export const requestApplicationUpdate = (id: number, attended: boolean, feePaid: boolean, isLeader?: boolean) => {
  return request.post('/api/application/management', {
    id,
    attended,
    feePaid,
    isLeader,
  });
};

export const requestYoutube = () => {
  return request.get('/api/youtube');
};

export const requestCreateYoutube = (retreatId: number, title: string, link: string) => {
  return request.post('/api/youtube', {
    retreatId,
    title,
    link
  });
};
