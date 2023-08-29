export interface Games {
  handle: string;
  nom: string;
  //image_url: string;
  imageURL: string;
  _id: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
}

export interface UserStore {
  setUser: (user: UserInfo) => void;
}
