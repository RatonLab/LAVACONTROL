import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const usersCollection = collection(db, 'usuarios');

export const UserService = {
  // Crear usuario
  async createUser(userData) {
    return await addDoc(usersCollection, userData);
  },

  // Obtener todos los usuarios creados por el admin actual
  async getAllUsers() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return [];

    const q = query(usersCollection, where('adminId', '==', currentUser.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
  },

  // (Opcional) Agregar adminId si falta
  async asignarAdminIdSiFalta() {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const snapshot = await getDocs(usersCollection);
    const updates = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      if (!data.adminId) {
        updates.push(updateDoc(doc(db, 'usuarios', docSnap.id), {
          adminId: currentUser.uid,
        }));
      }
    }

    await Promise.all(updates);
  }
};
