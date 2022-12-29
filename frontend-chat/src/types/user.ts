export interface User {
  id: number;
  name: string;

  [key: string]: string | object | number;
}
