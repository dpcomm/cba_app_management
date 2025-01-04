export interface User {
  id: number | null,
  userId: string,
  rank: string,
  password: string,
  name: string,
  group: string,
  phone: string,
  birth: string,
  gender: string,
}

export interface Application {
  id: number | null;
  idn: string;
  surveyData: {
    meal: number[][];
    transfer: {
      transfer: string;
      "own-car": string;
      bus: [number, number];
    };
  };
  attended: boolean;
  feePaid: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string | null;
  retreatId: number | null;
}

export interface Youtube {
  id: number;
  retreatId: number;
  title: string;
  link: string;
  createdAt: string;
}

export interface ApplicationCheck {
  id: number;
  name: string;
  group: string;
  gender: string;
  phone: string;
  birth: string;
  isLeader: boolean;
  attended: boolean;
  feePaid: boolean;
  userId: string;
  title: string;
}
export interface ApplicationStatusType {
  id: number;
  attended: boolean;
  feePaid: boolean;
  transfer: string;
  ownCar: string;
  bus: [number, number];
  name: string;
  title: string;
}


export interface IsLoading {
  isLoading: boolean
}