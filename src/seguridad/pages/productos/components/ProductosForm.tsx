import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import apiClient from "../../../../services/api-client";
import { BackendResponse, Producto } from "../../../../interfaces/interfaces";
import { ApiEndpoints, Messages } from "../../../../models/enums";
import { ErrorText } from "../../../../components/ErrorText";
import { FormBoxContainer, PageTitle } from "../../../../components";

interface Props {
  setOpen: (open: boolean) => void;
  setToastMessage: (toastMessage: string) => void;
}

export const ProductosForm = ({ setOpen, setToastMessage }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProductoById();
  }, []);

  const getProductoById = async () => {
    if (!id || id === "0") return;

    const { data } = await apiClient.get<BackendResponse>(
      `/${ApiEndpoints.PRODUCTOS}/${id}`
    );

    if (!data) return;
    const { data: responseData } = data;
    setValue("id", responseData.id);
    setValue("name", responseData.name);
    setValue("price", responseData.price);
    setValue("stock", responseData.stock);
    setValue("habilitado", responseData.habilitado === 1 ? true : false);
  };

  const store = async (formData: any) => {
    console.log("🚀 ~ store ~ formData:", formData);
    try {
      const { data } = await apiClient.post<BackendResponse>(
        `/${ApiEndpoints.PRODUCTOS}`,
        formData
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
      console.log("🚀 ~ store ~ error:", error);
      showMessage(JSON.stringify(error));
    }
  };

  const update = async (formData: any) => {
    console.log("🚀 ~ update ~ formData:", formData);
    try {
      const { data } = await apiClient.put<BackendResponse>(
        `/${ApiEndpoints.PRODUCTOS}/${id}`,
        formData
      );
      if (!data) {
        showMessage(Messages.NO_SE_PUDO_COMPLETAR);
        return;
      }

      showMessage(data.message);
      setTimeout(() => {
        cancel();
      }, 1000);
    } catch (error) {
      console.log("🚀 ~ file: AplicacionForm.tsx:55 ~ store ~ error:", error);
      showMessage(JSON.stringify(error));
    }
  };

  const cancel = () => navigate(`/${ApiEndpoints.PRODUCTOS}`);

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
        <Grid container sx={{ mb: 4 }}>
          {/* Titulo Formulario */}
          <Grid item xs={12}>
            <PageTitle title="Formulario de Productos" variant="h5" />
          </Grid>

          <Grid container item xs={12} lg={6} xl={5}>
            {/* Id */}
            <Grid item xs={12} lg={3} sx={{ p: 1 }}>
              <TextField
                {...register("id")}
                label="Id"
                defaultValue="0"
                disabled
                sx={{ width: "100%", pr: "16px" }}
              />
            </Grid>

            {/* Nombre */}
            <Grid item xs={12} lg={12} sx={{ p: 1 }}>
              <TextField
                {...register("name", {
                  required: true,
                  minLength: { value: 3, message: "error message" },
                })}
                required
                label="Nombre"
                defaultValue="---"
                error={
                  errors.name?.type === "required" ||
                  errors.name?.type === "minLength"
                    ? true
                    : false
                }
                onFocus={() =>
                  getValues("name") === "---" ? setValue("name", "") : null
                }
                onBlur={() =>
                  getValues("name") === "" ? setValue("name", "---") : null
                }
                sx={{ width: "100%" }}
              />
              {(errors.name?.type === "required" ||
                errors.name?.type === "minLength") && (
                <ErrorText text="El name del rol es obligatorio" />
              )}
            </Grid>

            {/* Precio */}
            <Grid item xs={12} lg={12} sx={{ p: 1 }}>
              <TextField
                {...register("price", {
                  required: "El precio es obligatorio",
                  min: 0.1,
                })}
                required
                label="Precio"
                type="number"
                defaultValue={0}
                error={!!errors.price}
                sx={{ width: "100%" }}
              />
              {!!errors.price && (
                <ErrorText text={errors.price.message?.toString() || "Error"} />
              )}
            </Grid>

            {/* Stock */}
            <Grid item xs={12} lg={12} sx={{ p: 1 }}>
              <TextField
                {...register("stock", {
                  required: "El Stock es obligatorio",
                  min: 0,
                })}
                required
                label="Stock"
                type="number"
                defaultValue={0}
                error={!!errors.stock}
                sx={{ width: "100%" }}
              />
              {!!errors.stock && (
                <ErrorText text={errors.stock.message?.toString() || "Error"} />
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Botones */}
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={6} sm={3} md={2}>
            <Button
              size="medium"
              variant="contained"
              sx={{ width: { xs: "100%", sm: "initial" } }}
              type="submit"
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
              {id === "0" ? "Cancelar" : "Atras"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormBoxContainer>
  );
};
