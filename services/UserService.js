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
  // Crear usuario
  async createUser(userData) {
    // Validación para asegurar que se registren usuarios completos
    if (!userData.email || !userData.nombre || !userData.rol) {
      throw new Error('Faltan datos obligatorios del usuario');
    }
    return await addDoc(usersCollection, userData);
  },

  // Obtener todos los usuarios (evita errores con documentos incompletos)
  async getAllUsers() {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return data && data.email ? { id: doc.id, ...data } : null;
      })
      .filter(Boolean); // elimina los nulls
  },

  // Actualizar usuario completo
  async updateUser(userId, updatedData) {
    const userRef = doc(db, 'usuarios', userId);
    return await updateDoc(userRef, updatedData);
  },

  // Eliminar usuario
  async deleteUser(userId) {
    const userRef = doc(db, 'usuarios', userId);
    return await deleteDoc(userRef);
  }
};
