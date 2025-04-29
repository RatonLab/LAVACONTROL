// services/UserService.js
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

const usersCollection = collection(db, 'usuarios');

export const UserService = {
  // Crear nuevo usuario
  async createUser(userData) {
    try {
      const docRef = await addDoc(usersCollection, userData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return { success: false, error };
    }
  },

  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const snapshot = await getDocs(usersCollection);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  },

  // Actualizar rol de usuario
  async updateUserRole(userId, newRole) {
    try {
      const userRef = doc(db, 'usuarios', userId);
      await updateDoc(userRef, { rol: newRole });
      return { success: true };
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      return { success: false, error };
    }
  },

  // Eliminar usuario
  async deleteUser(userId) {
    try {
      const userRef = doc(db, 'usuarios', userId);
      await deleteDoc(userRef);
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return { success: false, error };
    }
  }
};
