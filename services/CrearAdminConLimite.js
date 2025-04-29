import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function crearAdministradorConLimite(email, nombre, limiteUsuarios) {
  try {
    const usuariosRef = collection(db, 'usuarios');

    await addDoc(usuariosRef, {
      nombre: nombre,
      email: email.toLowerCase(),
      rol: 'administrador',
      limiteUsuarios: limiteUsuarios,
    });

    console.log('Administrador creado exitosamente.');
  } catch (error) {
    console.error('Error al crear administrador:', error);
  }
}
