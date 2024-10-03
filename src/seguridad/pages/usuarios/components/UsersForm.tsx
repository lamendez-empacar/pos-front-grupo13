import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../auth/context/useAuth";
import { Controller, useForm } from "react-hook-form";
import apiClient from "../../../../services/api-client";
import { BackendResponse, Rol, User } from "../../../../interfaces/interfaces";
import { ApiEndpoints, Messages } from "../../../../models/enums";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FormBoxContainer, PageTitle } from "../../../../components";
import { ErrorText } from "../../../../components/ErrorText";

interface Props {
  setOpen: (open: boolean) => void;
  setToastMessage: (toastMessage: string) => void;
}

export const UsersForm = ({ setOpen, setToastMessage }: Props) => {
  const { id } = useParams();
  const { authState } = useAuth();
  const [userRoles, setUserRoles] = useState<Rol[]>([]);
  const {
    control,
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const { user } = authState;
  const passWatched = watch("password");

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    if (!id || id === "0") return;

    const { data } = await apiClient.get<BackendResponse>(
      `/${ApiEndpoints.USERS}/${id}`
    );

    if (!data) return;
    const userdata = data.data as User;
    setUserRoles(userdata.roles);
    setValue("id", userdata.id);
    setValue("name", userdata.name);
    setValue("email", userdata.email);
    setValue("habilitado", userdata.habilitado === 1 ? true : false);
  };

  const store = async (formData: any) => {
    const datos = { ...formData };

    try {
      const { data } = await apiClient.post<BackendResponse>(
        `/${ApiEndpoints.USERS}`,
        {
          ...datos,
          user: user?.id,
          codigo_app: import.meta.env.VITE_CODIGO_APP,
        }
      );
      if (!data) {
        showMessage(Messages.NO_SE_PUDO_COMPLETAR);
        return;
      }
      if (!data.success) {
        showMessage(data.message);
        return;
      }

      showMessage(data.message);
      setTimeout(() => {
        cancel();
      }, 1000);
    } catch (error) {
      console.log("🚀 ~ file: AplicacionForm.tsx:55 ~ store ~ error:", error);
    }
  };

  const handleEliminar = async (rol_id: number) => {
    try {
      const datos = {
        user_id: id,
        rol_id: rol_id,
        codigo_app: import.meta.env.VITE_CODIGO_APP,
      };
      const { data } = await apiClient.post<BackendResponse>(
        `/${ApiEndpoints.ELIMINAR_USUARIO_ROL}`,
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

      showMessage(data.message);
      getUserById();
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (formData: any) => {
    const datos = {
      ...formData,
      user: user?.id,
      user_id: id,
      codigo_app: import.meta.env.VITE_CODIGO_APP,
    };
    if (datos.area === "...") datos.area = null;
    if (datos.url === "...") datos.url = null;
    if (datos.descripcion === "...") datos.descripcion = null;
    if (datos.base_datos === "...") datos.base_datos = null;
    if (datos.icono === "...") datos.icono = null;

    try {
      const { data } = await apiClient.put<BackendResponse>(
        `/${ApiEndpoints.USERS}/${id}`,
        datos
      );

      if (!data) {
        showMessage(Messages.NO_SE_PUDO_COMPLETAR);
        return;
      }

      if (!data.success) {
        showMessage(data.message);
        return;
      }

      showMessage(data.message);
      setTimeout(() => {
        cancel();
      }, 1000);
    } catch (error) {
      console.log("🚀 ~ file: AplicacionForm.tsx:55 ~ store ~ error:", error);
    }
  };

  const cancel = () => navigate(`/${ApiEndpoints.USERS}`);

  const submitForm = (event: any) => {
    if (id === "0") {
      store(event);
    } else {
      update(event);
    }
  };

  const showMessage = (text: string = "Operacion correcta") => {
    setToastMessage(text);
    setOpen(true);
  };

  const validarPasswords = (value: string) => {
    if (value !== passWatched) return "Las contraseñas no coinciden";
  };

  return (
    <FormBoxContainer>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{
          backgroundColor: "white",
          p: 2, // 4 * 8
          borderRadius: 2, // 4 * 4
        }}
      >
        {/* Formulario */}
        <Grid
          container
          spacing={2}
          sx={{
            mb: 4,
            justifyContent: { xs: "center", sm: "start", maxWidth: "600px" },
          }}
        >
          {/* Titulo Formulario */}
          <Grid item xs={12}>
            <PageTitle
              title="Formulario de Usuarios"
              variant="h5"
              divider={true}
            />
          </Grid>

          {/* Id */}
          <Grid item xs={12} md={3}>
            <TextField
              {...register("id")}
              label="Id"
              defaultValue="0"
              disabled
              sx={{ width: "100%", pr: "16px" }}
            />
          </Grid>

          {/* Nombre */}
          <Grid item xs={12} md={9}>
            <TextField
              {...register("name", {
                required: true,
                minLength: { value: 4, message: "error message" },
              })}
              required
              label="Nombre"
              defaultValue="..."
              onFocus={() =>
                getValues("name") === "..." ? setValue("name", "") : null
              }
              error={
                errors.name?.type === "required" ||
                errors.name?.type === "minLength"
                  ? true
                  : false
              }
              sx={{ width: "100%", pr: "16px" }}
            />
            {(errors.name?.type === "required" ||
              errors.name?.type === "minLength") && (
              <ErrorText text="El Username es obligatorio" />
            )}
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              {...register("email", { required: "El email es obligatorio" })}
              label="Email"
              // defaultValue="email@empacar.com.bo"
              error={!!errors.email}
              sx={{ width: "100%", pr: "16px" }}
            />
            {!!errors.email && (
              <ErrorText text={errors.email.message?.toString() || "Error"} />
            )}
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 8, message: "Minimo 8 caracteres" },
              })}
              required
              label="Password"
              type="password"
              // defaultValue="..."
              onFocus={() =>
                getValues("password") === "..."
                  ? setValue("password", "")
                  : null
              }
              error={!!errors.password}
              sx={{ width: "100%", pr: "16px" }}
            />
            {!!errors.password && (
              <ErrorText
                text={errors.password.message?.toString() || "Error"}
              />
            )}
          </Grid>

          {/* Confirmar Password */}
          <Grid item xs={12}>
            <TextField
              {...register("password_confirmation", {
                required: true,
                minLength: { value: 8, message: "Minimo 8 caracteres" },
                validate: validarPasswords,
              })}
              required
              label="confirmar Password"
              type="password"
              error={!!errors.password_confirmation}
              sx={{ width: "100%", pr: "16px" }}
            />
            {errors.password_confirmation && (
              <ErrorText
                text={
                  errors.password_confirmation.message?.toString() || "Error"
                }
              />
            )}
          </Grid>

          {/* Habilitado */}
          <Grid item xs={12} sm={4} md={3}>
            <Controller
              name="habilitado"
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel component="legend">Estado</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => field.onChange(e.target.checked)}
                          checked={field.value || false}
                        />
                      }
                      label="Habilitado"
                    />
                  </FormGroup>
                </>
              )}
            />
          </Grid>

          {/* Vacio */}
          <Grid item xs={12} sm={4}></Grid>

          {/* Roles del Usuario*/}
          <Grid item xs={12} sm={4}>
            <Typography variant="body2">Roles del usuario</Typography>
            <Divider />
            <List>
              {userRoles.map((rol) => (
                <ListItem key={rol.rol_id}>
                  <ListItemText primary={rol.nombre} />

                  <IconButton
                    color="error"
                    onClick={() => handleEliminar(rol.rol_id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {/* Botones */}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3} md={2}>
            <Button
              size="medium"
              variant="contained"
              type="submit"
              sx={{ width: { xs: "100%", sm: "initial" } }}
            >
              Guardar
            </Button>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              size="medium"
              variant="outlined"
              sx={{ width: { xs: "100%", sm: "initial" } }}
              onClick={cancel}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormBoxContainer>
  );
};
