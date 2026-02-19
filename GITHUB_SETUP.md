# Conectar este proyecto con GitHub

El repositorio Git ya está inicializado y el primer commit está hecho.

## Pasos para crear el repo en GitHub y subir el código

### 1. Crear el repositorio en GitHub

1. Entra en **https://github.com/new**
2. **Repository name:** `harmonious-health-hub` (o el nombre que prefieras)
3. Elige **Public**
4. **No** marques "Add a README" ni ".gitignore" (ya existen en tu proyecto)
5. Clic en **Create repository**

### 2. Conectar y subir desde tu PC

En la terminal, dentro de la carpeta del proyecto, ejecuta (sustituye `TU_USUARIO` por tu usuario de GitHub):

```powershell
git remote add origin https://github.com/TU_USUARIO/harmonious-health-hub.git
git branch -M main
git push -u origin main
```

Si GitHub te pide autenticación, usa tu usuario y un **Personal Access Token** (no la contraseña) como contraseña.

---

Listo. Después de esto tu proyecto quedará en GitHub y podrás seguir haciendo `git push` y `git pull` con normalidad.
