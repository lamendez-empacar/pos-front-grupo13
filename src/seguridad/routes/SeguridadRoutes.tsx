import { useContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import {
  EmpresasPage,
  InicioPage,
  PersonasPage,
  ProductosPage,
  RolesAccesosPage,
  VentasPage,
} from "../pages";
import { AplicacionForm, AplicacionesPage } from "../pages/aplicaciones";
import { ComponentesPage } from "../pages/componentes/ComponentesPage";
import { ModuloForm, ModulosPage } from "../pages/modulos";
import { NavBar, SideBar } from "../../ui";
import { RolesPage } from "../pages/roles/RolesPage";
import { RolFormPage } from "../pages/roles/components";
import { SeguridadProtectedRoutes } from "./SeguridadProtectedRoutes";
import { UsuariosPage } from "../pages/usuarios/UsuariosPage";
import { EmpresaForm } from "../pages/empresas";
import { UsersForm } from "../pages/usuarios";
import { RolesAccesosForm } from "../pages/rolesAccesos";
import { BitacoraPage } from "../pages/bitacora";
import { UsuarioRolBaseForm, UsuarioRolForm } from "../pages/usuarioRol";
import { ComponentsForm } from "../pages/componentes";
import { RolAsignacionForm, RolAsignacionPage } from "../pages/rolAsignacion";
import { PersonasForm } from "../pages/personas";
import { UseToastMessage } from "../../hooks/useToastMessage";
import { Snackbar } from "@mui/material";
import { ProductosForm } from "../pages/productos/components";
import { VentasForm } from "../pages/ventas/components";

export const SeguridadRoutes = () => {
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
          <Route element={<SeguridadProtectedRoutes url="inicio" />}>
            <Route path="inicio" element={<InicioPage />} />
          </Route>

          {/* Roles */}
          <Route
            element={<SeguridadProtectedRoutes url="roles_accesos_index" />}
          >
            <Route path="roles-accesos" element={<RolesAccesosPage />} />
          </Route>

          {/* Accesos */}
          <Route element={<SeguridadProtectedRoutes url="accesos_index" />}>
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

          {/* Aplicaciones */}
          <Route
            element={<SeguridadProtectedRoutes url="aplicaciones_index" />}
          >
            <Route
              path="aplicaciones"
              element={
                <AplicacionesPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="aplicaciones/:id"
              element={
                <AplicacionForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Empresas */}
          <Route element={<SeguridadProtectedRoutes url="empresas_index" />}>
            <Route
              path="empresas"
              element={
                <EmpresasPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="empresas/:id"
              element={
                <EmpresaForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Modulos */}
          <Route element={<SeguridadProtectedRoutes url="modulos_index" />}>
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

          {/* Componentes */}
          <Route element={<SeguridadProtectedRoutes url="componentes_index" />}>
            <Route
              path="componentes"
              element={
                <ComponentesPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="componentes/:id"
              element={
                <ComponentsForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Personas */}
          <Route element={<SeguridadProtectedRoutes url="personas_index" />}>
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

          {/* Personas Usuarios */}
          <Route
            element={<SeguridadProtectedRoutes url="personas_usuarios_index" />}
          >
            <Route
              path="personas-usuarios"
              element={
                <AplicacionesPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Bitacora */}
          <Route element={<SeguridadProtectedRoutes url="bitacora_index" />}>
            <Route path="bitacora" element={<BitacoraPage />} />
          </Route>

          {/* Roles */}
          <Route element={<SeguridadProtectedRoutes url="roles_index" />}>
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
          <Route
            element={<SeguridadProtectedRoutes url="rol_asignacion_index" />}
          >
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
          <Route element={<SeguridadProtectedRoutes url="users_index" />}>
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
          <Route
            element={<SeguridadProtectedRoutes url="usuario_rol_insert" />}
          >
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

          {/* Productos */}
          <Route element={<SeguridadProtectedRoutes url="productos_insert" />}>
            <Route
              path="productos"
              element={
                <ProductosPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="productos/:id"
              element={
                <ProductosForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>

          {/* Productos */}
          <Route element={<SeguridadProtectedRoutes url="ventas_insert" />}>
            <Route
              path="ventas"
              element={
                <VentasPage
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
            <Route
              path="ventas/:id"
              element={
                <VentasForm
                  setToastMessage={setToastMessage}
                  setOpen={setOpen}
                />
              }
            />
          </Route>
          <Route path="/" element={<Navigate to="/inicio" />} />
        </Routes>
      </div>
    </>
  );
};
