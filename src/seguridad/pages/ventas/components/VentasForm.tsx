import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import apiClient from "../../../../services/api-client";
import {
  BackendResponse,
  Cliente,
  DetalleVenta,
  Producto,
} from "../../../../interfaces/interfaces";
import { ApiEndpoints, Messages } from "../../../../models/enums";
import { FormBoxContainer, PageTitle } from "../../../../components";
import { Add, Remove } from "@mui/icons-material";

interface Props {
  setOpen: (open: boolean) => void;
  setToastMessage: (toastMessage: string) => void;
}

interface FormVentas {
  cliente_id: number;
  cliente_name: string;
  id: number;
  price: string;
  product_name: string;
  producto_id: number | null;
  quantity: string;
  total: number;
  items: {
    name: string;
    price: string;
    producto_id: number;
    quantity: string;
    total: number;
  }[];
}

export const VentasForm = ({ setOpen, setToastMessage }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<FormVentas>();
  const { fields, append, update, remove } = useFieldArray({
    name: "items",
    control,
    rules: { required: "Selecciona al menos 1 producto" },
  });
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [detalle, setDetalle] = useState<DetalleVenta[]>([]);
  const watchedFields = watch("items");
  const watchedProducto = watch("producto_id");
  const watchedId = watch("id");

  useEffect(() => {
    getVentaById();
    getClientes();
    getProductos();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ watchedProducto:", watchedProducto);
    if (!watchedProducto) return;
    const producto = productos.find((p) => p.id === watchedProducto);
    console.log("🚀 ~ useEffect ~ producto:", producto);
    if (!producto) return;
    setValue("product_name", producto.name);
    setValue("price", producto.price.toString());
    setValue("product_name", producto.name);
  }, [watchedProducto]);

  useEffect(() => {
    if (watchedFields?.length === 0) {
      setValue("total", 0);
      return;
    }
    const suma = fields.reduce((sum, p) => {
      return sum + p.total;
    }, 0);
    setValue("total", suma);
  }, [watchedFields]);

  const getVentaById = async () => {
    if (!id || id === "0") return;

    const { data } = await apiClient.get<BackendResponse>(
      `/${ApiEndpoints.VENTAS}/${id}`
    );

    if (!data) return;
    const { data: responseData } = data;
    setValue("id", responseData.id);
    setValue("cliente_id", responseData.cliente_id);
    setValue("cliente_name", responseData.cliente_name);
    setValue("total", responseData.total);
    setDetalle(responseData.detalle);
    // setValue("habilitado", responseData.habilitado === 1 ? true : false);
  };

  const getClientes = async () => {
    const { data } = await apiClient.get<BackendResponse>(
      `/${ApiEndpoints.CLIENTES}`
    );

    if (!data) {
      showMessage("No se pudo completar la operacion");
      return;
    }

    if (!data.success) {
      showMessage(data.message);
      return;
    }

    setClientes([...data.data]);
  };

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

  const store = async (formData: any) => {
    console.log("🚀 ~ store ~ formData:", formData);
    // return;
    try {
      const detalleVentas = formData.items.map((x: any) => {
        return {
          id: x.producto_id,
          quantity: parseInt(x.quantity),
          price: parseFloat(x.price),
          total: x.total,
        };
      });
      const { data } = await apiClient.post<BackendResponse>(
        `/${ApiEndpoints.VENTAS}`,
        { ...formData, detalleVentas }
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

  const updateform = async (formData: any) => {
    console.log("🚀 ~ update ~ formData:", formData);
    try {
      const { data } = await apiClient.put<BackendResponse>(
        `/${ApiEndpoints.VENTAS}/${id}`,
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

  const cancel = () => navigate(`/${ApiEndpoints.VENTAS}`);

  const submitForm = (event: any) => {
    if (id === "0") {
      store(event);
    } else {
      updateform(event);
    }
  };

  const showMessage = (text: string = "Operacion correcta") => {
    setToastMessage(text);
    setOpen(true);
  };

  const agregarProducto = () => {
    if (!getValues("producto_id")) return;
    append({
      name: getValues("product_name"),
      price: getValues("price"),
      quantity: getValues("quantity"),
      producto_id: getValues("producto_id") ?? 0,
      total: parseFloat(getValues("quantity")) * parseFloat(getValues("price")),
    });

    setValue("producto_id", null);
    setValue("price", "0");
    setValue("quantity", "1");
    setValue("product_name", "");
  };

  const aumentarCantidad = (index: number) => {
    const newQuantity = parseInt(fields[index].quantity) + 1;
    const newTotal = newQuantity * parseFloat(fields[index].price);
    update(index, {
      ...fields[index],
      quantity: newQuantity.toString(),
      total: newTotal,
    });
  };

  const disminuirCantidad = (index: number) => {
    if (parseInt(fields[index].quantity) === 1) {
      remove(index);
      return;
    }
    const newQuantity = parseInt(fields[index].quantity) - 1;
    const newTotal = newQuantity * parseFloat(fields[index].price);
    update(index, {
      ...fields[index],
      quantity: newQuantity.toString(),
      total: newTotal,
    });
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
            <PageTitle
              title="Formulario de Ventas"
              variant="h5"
              divider={true}
            />
          </Grid>

          <Grid container item xs={12} lg={8} xl={6}>
            {/* Id */}
            <Grid item xs={12} md={6} lg={3} sx={{ p: 1 }}>
              <TextField
                {...register("id")}
                label="Id"
                defaultValue="0"
                disabled
                sx={{ width: "100%", pr: "16px" }}
              />
            </Grid>
            {/* Cliente */}
            <Grid item xs={12} sm={8} md={6} sx={{ p: 1 }}>
              <Controller
                name="cliente_id"
                rules={{ required: true }}
                control={control}
                render={({ field }) => {
                  const { onChange, value } = field;
                  return (
                    <Autocomplete
                      value={
                        value
                          ? clientes.find((option) => value === option.id) ??
                            null
                          : null
                      }
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          {option.name}
                        </Box>
                      )}
                      onChange={(_event: any, newValue) =>
                        onChange(newValue ? newValue.id : null)
                      }
                      options={clientes}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Cliente *"
                          inputProps={{
                            ...params.inputProps,
                          }}
                          error={
                            errors.cliente_id?.type === "required"
                              ? true
                              : false
                          }
                        />
                      )}
                    />
                  );
                }}
              />
              {errors.cliente_id?.type === "required" && (
                <Typography color={"#d32f2f"} paddingTop={1} fontSize={12.5}>
                  El Usuario es obligatorio
                </Typography>
              )}
            </Grid>
            {/* Total */}
            <Grid item xs={12} md={6} lg={3} sx={{ p: 1 }}>
              <TextField
                {...register("total")}
                label="Total"
                defaultValue={0}
                inputProps={{
                  readOnly: true,
                }}
                sx={{ width: "100%", pr: "16px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Form Producto */}
            <Grid container item xs={12}>
              {/* Producto */}
              <Grid item xs={12} sm={8} md={6} sx={{ p: 1 }}>
                <Controller
                  name="producto_id"
                  // rules={{ required: true }}
                  control={control}
                  render={({ field }) => {
                    const { onChange, value } = field;
                    return (
                      <Autocomplete
                        value={
                          value
                            ? productos.find((option) => value === option.id) ??
                              null
                            : null
                        }
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <Box component="li" {...props}>
                            {option.name}
                          </Box>
                        )}
                        onChange={(_event: any, newValue) =>
                          onChange(newValue ? newValue.id : null)
                        }
                        disabled={!!watchedId}
                        options={productos}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Producto *"
                            inputProps={{
                              ...params.inputProps,
                            }}
                            error={
                              errors.cliente_id?.type === "required"
                                ? true
                                : false
                            }
                          />
                        )}
                      />
                    );
                  }}
                />
                {errors.cliente_id?.type === "required" && (
                  <Typography color={"#d32f2f"} paddingTop={1} fontSize={12.5}>
                    El Usuario es obligatorio
                  </Typography>
                )}
              </Grid>

              {/* Precio */}
              <Grid item xs={12} md={6} lg={3} sx={{ p: 1 }}>
                <TextField
                  {...register("price")}
                  label="Precio"
                  defaultValue={0}
                  disabled={!!watchedId}
                  inputProps={{
                    readOnly: true,
                  }}
                  sx={{ width: "100%", pr: "16px" }}
                />
              </Grid>

              {/* Cantidad */}
              <Grid item xs={12} md={6} lg={3} sx={{ p: 1 }}>
                <TextField
                  {...register("quantity")}
                  label="Cantidad"
                  defaultValue={1}
                  type="number"
                  disabled={!!watchedId}
                  sx={{ width: "100%", pr: "16px" }}
                />
              </Grid>

              {/* Boton agregar */}
              {!watchedId && (
                <Grid item xs={3} sx={{ display: "flex", p: 1 }}>
                  <Button
                    size="medium"
                    variant="contained"
                    // sx={{ width: { xs: "100%", sm: "initial" } }}
                    type="button"
                    onClick={agregarProducto}
                  >
                    Agregar
                  </Button>
                </Grid>
              )}
            </Grid>

            {/* Detalle Form */}
            {!watchedId && (
              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Id</TableCell>
                      <TableCell>Producto</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {fields.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.producto_id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.total}</TableCell>
                        <TableCell>
                          {" "}
                          <IconButton
                            color="primary"
                            onClick={() => aumentarCantidad(index)}
                          >
                            <Add />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => disminuirCantidad(index)}
                          >
                            <Remove />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            )}

            {/* Detalle Solicitud Obtenida desde BD */}
            {!!watchedId && (
              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Id</TableCell>
                      <TableCell>Producto</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {detalle.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.producto_id}</TableCell>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Botones */}
        <Grid container sx={{ p: 1 }}>
          {!watchedId && (
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
          )}

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
