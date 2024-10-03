import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { useAuth } from "../../../auth/context/useAuth";
import {
  BackendResponse,
  Producto,
  Venta,
} from "../../../interfaces/interfaces";
import apiClient from "../../../services/api-client";
import {
  ApiEndpoints,
  ModulosSistema,
  TipoAcceso,
} from "../../../models/enums";
import useAutorizado from "../../../hooks/useAutorizado";
import { PageBox, PageTitle } from "../../../components";
import { VentasTable } from "./components";

interface Props {
  setOpen: (open: boolean) => void;
  setToastMessage: (toastMessage: string) => void;
}

export const VentasPage = ({ setOpen, setToastMessage }: Props) => {
  const { authState } = useAuth();
  const [ventas, setVentas] = useState<Venta[]>([]);
  const { accesos, user } = authState;
  const navigate = useNavigate();
  const { allowed: allowInsert } = useAutorizado(
    ModulosSistema.VENTAS + TipoAcceso.INSERT,
    accesos
  );
  const { allowed: allowUpdate } = useAutorizado(
    ModulosSistema.VENTAS + TipoAcceso.UPDATE,
    accesos
  );

  useEffect(() => {
    getVentas();
  }, []);

  const getVentas = async () => {
    const { data } = await apiClient.get<BackendResponse>(
      `/${ApiEndpoints.VENTAS}`
    );

    if (!data) {
      showMessage("No se pudo completar la operacion");
      return;
    }

    if (!data.success) {
      showMessage(data.message);
      return;
    }
    setVentas([...data.data]);
  };

  const handleOpen = (id: number) => {
    navigate(`/${ApiEndpoints.VENTAS}/${id}`);
  };

  const showMessage = (text: string = "Operacion correcta") => {
    setToastMessage(text);
    setOpen(true);
  };

  return (
    <PageBox>
      <Container>
        <PageTitle title="Ventas" divider={true} />

        {allowInsert && (
          <Button
            variant="contained"
            onClick={() => handleOpen(0)}
            sx={{ mb: 2 }}
          >
            Nueva Venta
          </Button>
        )}

        {ventas && (
          <VentasTable
            allowUpdate={allowUpdate}
            ventas={ventas}
            handleOpen={handleOpen}
          />
        )}
      </Container>
    </PageBox>
  );
};
