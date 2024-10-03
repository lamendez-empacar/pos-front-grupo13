import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { useAuth } from "../../../auth/context/useAuth";
import { BackendResponse, Producto } from "../../../interfaces/interfaces";
import apiClient from "../../../services/api-client";
import {
  ApiEndpoints,
  ModulosSistema,
  TipoAcceso,
} from "../../../models/enums";
import useAutorizado from "../../../hooks/useAutorizado";
import { PageBox, PageTitle } from "../../../components";
import { ProductosTable } from "./components";

interface Props {
  setOpen: (open: boolean) => void;
  setToastMessage: (toastMessage: string) => void;
}

export const ProductosPage = ({ setOpen, setToastMessage }: Props) => {
  const { authState } = useAuth();
  const [productos, setProductos] = useState<Producto[]>([]);
  const { accesos, user } = authState;
  const navigate = useNavigate();
  const { allowed: allowInsert } = useAutorizado(
    ModulosSistema.PRODUCTOS + TipoAcceso.INSERT,
    accesos
  );
  const { allowed: allowUpdate } = useAutorizado(
    ModulosSistema.PRODUCTOS + TipoAcceso.UPDATE,
    accesos
  );

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    const { data } = await apiClient.get<BackendResponse>(
      `/${ApiEndpoints.PRODUCTOS}`
    );

    if (!data) {
      showMessage("No se pudo completar la operacion");
      return;
    }

    if (!data.success) {
      showMessage(data.message);
      return;
    }
    setProductos([...data.data]);
  };

  const handleOpen = (id: number) => {
    navigate(`/${ApiEndpoints.PRODUCTOS}/${id}`);
  };

  const handleHabilitar = async (id: number) => {
    const productoSeleccionado = productos.find(
      (producto) => producto.id === id
    );
    if (!productoSeleccionado) return;

    try {
      const datos = {
        user: user?.id,
        codigo_app: import.meta.env.VITE_CODIGO_APP,
      };
      const { data } = await apiClient.put<BackendResponse>(
        `/${ApiEndpoints.HABILITAR_ROLES}/${id}`,
        { ...datos }
      );

      if (!data) {
        showMessage("No se pudo completar la operación");
        return;
      }

      if (!data.success) {
        showMessage(data.message);
        return;
      }

      const productoModificado = data.data as Producto;
      const newProductos = productos.map((rol) => {
        if (rol.id === productoModificado.id) {
          rol.habilitado = productoModificado.habilitado;
        }
        return rol;
      });
      showMessage(data.message);
      setProductos(newProductos);
    } catch (error) {
      console.log(error);
    }
  };

  const showMessage = (text: string = "Operacion correcta") => {
    setToastMessage(text);
    setOpen(true);
  };

  return (
    <PageBox>
      <Container>
        <PageTitle title="Productos" divider={true} />

        {allowInsert && (
          <Button
            variant="contained"
            onClick={() => handleOpen(0)}
            sx={{ mb: 2 }}
          >
            Nuevo Producto
          </Button>
        )}

        {productos && (
          <ProductosTable
            allowUpdate={allowUpdate}
            productos={productos}
            handleHabilitar={handleHabilitar}
            handleOpen={handleOpen}
          />
        )}
      </Container>
    </PageBox>
  );
};
