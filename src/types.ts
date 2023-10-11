export interface Games {
  handle: string;
  nom: string;
  //image_url: string;
  imageURL: string;
  _id: string;
  dureePartie: string;
  nbJoueurs: string;
  categorie: string;
}

export interface UserInfo {
  id: string | null;
  username: string | null;
  email: string | null;
}

export interface UserStore {
  setUser: (user: UserInfo) => void;
}
