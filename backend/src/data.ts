import type { User } from "~~/types/user"
/**
 * On imagine que ce sont des données reçues de la base de données
 *
 * On spécifie ici que `animals` est un tableau contenant des `Animal`
 */
export const users: User[] = [
  { id: 1, name: 'Snoopy'},
  { id: 2, name: 'Pepper'},
  { id: 3, name: 'Whisky'},
  { id: 4, name: 'Tiplouf'}
]