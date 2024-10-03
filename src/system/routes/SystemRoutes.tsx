import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import {
  InicioPage,
  ModulosPage,
  PersonasPage,
  RolAsignacionPage,
  RolesPage,
  UsuariosPage,
} from "../pages";
import { NavBar, SideBar } from "../../ui";
import { PersonasForm } from "../pages/personas";
import { UseToastMessage } from "../../hooks/useToastMessage";
import { Snackbar } from "@mui/material";
import { SystemProtectedRoutes } from "./SystemProtectedRoutes";
import { RolFormPage } from "../pages/roles/components";
import { RolesAccesosPage, RolesAccesosForm } from "../pages/rolesAccesos";
import { UsuarioRolForm, UsuarioRolBaseForm } from "../pages/usuarioRol";
import { UsersForm } from "../pages/usuarios";
import { RolAsignacionForm } from "../pages/rolAsignacion";
import { ModuloForm } from "../pages/modulos";
// import { ApiEndpoints, ModulosSistema, TipoAcceso } from "../../models/enums";

export const SystemRoutes = () => {
  const { authState, toggle } = useContext(AuthContext);
  const { aplicacion, modulos, persona, rol, user } = authState;
  const [open, setOpen] = useState(false);
  const { toastMessage, setToastMessage } = UseToastMessage();
  const handleClose = () => {
    setOpen(false);
    setToastMessage("");
  };

  return (
    <>
      <NavBar aplicacion={aplicacion} onOpen={() => toggle(!authState.open)} />
      <SideBar
        aplicacion={aplicacion}
        open={authState.open}
        persona={persona}
        rol={rol}
        user={user}
        modulos={modulos}
        onCloseSideBar={() => toggle(false)}
      />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message={toastMessage}
      ></Snackbar>

      <div>
        <Routes>
          <Route element={<SystemProtectedRoutes url="inicio" />}>
            <Route path="inicio" element={<InicioPage />} />
          </Route>

          {/* Personas */}
          <Route element={<SystemProtectedRoutes url="personas_index" />}>
            <Route
              path="personas"
              element={
                <PersonasPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="personas/:id"
              element={
                <PersonasForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Roles */}
          <Route element={<SystemProtectedRoutes url="roles_accesos_index" />}>
            <Route path="roles-accesos" element={<RolesAccesosPage />} />
          </Route>

          {/* Accesos */}
          <Route element={<SystemProtectedRoutes url="accesos_index" />}>
            <Route
              path="accesos"
              element={
                <RolesAccesosForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="accesos/:id"
              element={
                <RolesAccesosForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Roles */}
          <Route element={<SystemProtectedRoutes url="roles_index" />}>
            <Route
              path="roles"
              element={
                <RolesPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="roles/:id"
              element={
                <RolFormPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Rol Asignacion */}
          <Route element={<SystemProtectedRoutes url="rol_asignacion_index" />}>
            <Route
              path="rol-asignacion"
              element={
                <RolAsignacionPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="rol-asignacion/:id"
              element={
                <RolAsignacionForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Users */}
          <Route element={<SystemProtectedRoutes url="users_index" />}>
            <Route
              path="users"
              element={
                <UsuariosPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="users/:id"
              element={
                <UsersForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="usuario-rol/:id"
              element={
                <UsuarioRolForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route path="usuario-rol-base" element={<UsuarioRolBaseForm />} />
          </Route>

          {/* Usuario Rol */}
          <Route element={<SystemProtectedRoutes url="usuario_rol_insert" />}>
            <Route
              path="usuario-rol/:id"
              element={
                <UsuarioRolForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Modulos */}
          <Route element={<SystemProtectedRoutes url="modulos_index" />}>
            <Route
              path="modulos"
              element={
                <ModulosPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="modulos/:id"
              element={
                <ModuloForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/inicio" />} />
        </Routes>
      </div>
    </>
  );
};
