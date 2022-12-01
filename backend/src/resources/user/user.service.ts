import type { User } from "~~/types/user";
import { users } from "~/data";
import { NotFoundException } from "~/utils/exceptions";

export class UserService {
  /**
   * On copie localement les animaux pour pouvoir insérer, supprimer etc
   */
  users: User[] = users;

  /**
   * Trouve tous les animaux
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * Trouve un animal en particulier
   * @param id - ID unique de l'animal
   */
  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Met à jour un animal en particulier
   *
   * /!\ Idéalement, il faudrait vérifier le contenu de la requête avant de le sauvegarder.
   *
   * @param userData - Un objet correspondant à un animal, il ne contient pas forcément tout un animal. Attention, on ne prend pas l'id avec.
   * @param id - ID unique de l'animal
   */
  update(userData: Partial<User>, id: number): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException("User not found");
    }

    /* On ne met jamais l'id à jour */
    delete userData.id;

    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  /**
   * @param userData - Un objet correspondant à un animal. Attention, on ne prend pas l'id avec.
   */
  create(userData: Omit<User, "id">): User {
    const newUser: User = {
      ...userData,
      id: Math.floor(Math.random() * 100),
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * Suppression d'un animal
   */
  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
