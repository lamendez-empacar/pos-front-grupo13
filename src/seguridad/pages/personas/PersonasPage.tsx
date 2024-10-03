import { Box, Button, Container } from "@mui/material";
import { useAuth } from "../../../auth/context/useAuth";
import { useEffect, useState } from "react";
import { BackendResponse, Persona } from "../../../interfaces/interfaces";
import apiClient from "../../../services/api-client";
import {
  ApiEndpoints,
  ModulosSistema,
  TipoAcceso,
} from "../../../models/enums";
import { PersonasTable } from ".";
import { useNavigate } from "react-router-dom";
import useAutorizado from "../../../hooks/useAutorizado";
import { PageBox, PageTitle } from "../../../components";

interface Props {
  setOpen: (open: boolean) => void;
  setToastMessage: (toastMessage: string) => void;
}

export const PersonasPage = ({ setOpen, setToastMessage }: Props) => {
  const { authState } = useAuth();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const { accesos, user } = authState;
  const navigate = useNavigate();
  const { allowed: allowInsert } = useAutorizado(
    ModulosSistema.PERSONAS + TipoAcceso.INSERT,
    accesos
  );
  const { allowed: allowUpdate } = useAutorizado(
    ModulosSistema.PERSONAS + TipoAcceso.UPDATE,
    accesos
  );

  useEffect(() => {
    getPersonas();
  }, []);

  const getPersonas = async () => {
    const { data } = await apiClient.get<BackendResponse>(
      `/${ApiEndpoints.PERSONAS}`
    );

    if (!data) {
      showMessage("No se pudo completar la operacion");
      return;
    }

    if (!data.success) {
      showMessage(data.message);
      return;
    }

    setPersonas([...data.data]);
  };

  const handleOpen = (id: number) => {
    navigate(`/personas/${id}`);
  };

  const handleHabilitar = async (id: number) => {
    try {
      const datos = {
        user: user?.id,
        codigo_app: import.meta.env.VITE_CODIGO_APP,
      };
      const { data } = await apiClient.put<BackendResponse>(
        `/${ApiEndpoints.HABILITAR_PERSONAS}/${id}`,
        datos
      );

      if (!data) {
        showMessage("No se pudo completar la operación");
        return;
      }

      if (!data.success) {
        showMessage(data.message);
        return;
      }

      const personaModificada = data.data as Persona;
      const newUsers = personas.map((persona) => {
        if (persona.persona_id === personaModificada.persona_id) {
          persona.habilitado = personaModificada.habilitado;
        }
        return persona;
      });
      showMessage(data.message);
      setPersonas(newUsers);
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
      <Container maxWidth="xl">
        <PageTitle title="Personas" />

        {allowInsert && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleOpen(0)}
              sx={{ mb: 2, mr: 2 }}
            >
              Nueva Persona
            </Button>
          </Box>
        )}

        {personas && (
          <PersonasTable
            allowUpdate={allowUpdate}
            personas={personas}
            handleHabilitar={handleHabilitar}
            handleOpen={handleOpen}
          />
        )}
      </Container>
    </PageBox>
  );
};
