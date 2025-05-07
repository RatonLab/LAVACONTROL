
# 📦 Respaldo de Proyecto - LavaControl

Este respaldo corresponde a una versión **funcional y estable** del proyecto LavaControl,
en la cual se corrigieron errores críticos relacionados con Expo SDK, Firebase y configuración general.

## ✅ Estado del Proyecto
- Funciona correctamente con **Expo SDK 52.0.46**
- Compatible con **Expo Go**
- Conectado a Firebase (Auth y Firestore)
- Splash funcional (imagen corregida)
- Navegación, autenticación y pantallas operativas

---

## 🛠️ Comandos utilizados para limpiar e iniciar correctamente

```bash
rd /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps
npx expo start -c
```

## 🔐 Configuración Firebase corregida

- Se actualizó la importación de `firebase/auth` para evitar error de ruta `react-native`
- Se configuró la persistencia con `AsyncStorage`

## 🗃️ Cómo crear un commit en una nueva rama

```bash
git checkout -b respaldo-funciona
git add .
git commit -m "Backup estable: app funcionando en Expo SDK 52 y Firebase ok"
git push origin respaldo-funciona  # solo si ya tienes repo remoto
```

---

_Última actualización automática generada por Sofita ✨_
