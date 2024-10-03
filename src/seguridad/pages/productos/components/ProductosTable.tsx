import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Producto } from "../../../../interfaces/interfaces";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { IconoHabilitado } from "../../../../components";
import { Edit } from "@mui/icons-material";

interface Props {
  allowUpdate: boolean;
  productos: Producto[];
  handleOpen: (aplicacion_id: number) => void;
  handleHabilitar: (aplicacion_id: number) => void;
}

export const ProductosTable = ({
  allowUpdate,
  productos,
  handleHabilitar,
  handleOpen,
}: Props) => {
  const columns = useMemo<MRT_ColumnDef<Producto>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "name",
        header: "Nombre",
      },
      {
        accessorKey: "price",
        header: "Precio",
      },
      {
        accessorKey: "habilitado",
        header: "Habilitado",
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={cell.getValue<number>() === 1 ? true : false}
                  disabled
                />
              }
              label=""
            />
          </FormGroup>
        ),
      },
    ],
    [productos]
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={productos}
      localization={MRT_Localization_ES}
      enableRowActions={allowUpdate}
      positionActionsColumn="last"
      initialState={{ density: "compact" }}
      defaultColumn={{
        size: 50,
      }}
      renderRowActions={({ row }) => [
        <Box
          sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}
          key={row.id}
        >
          <IconButton
            color="warning"
            onClick={() => handleHabilitar(row.original.id)}
          >
            <IconoHabilitado habilitado={row.original.habilitado} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleOpen(row.original.id)}
          >
            <Edit />
          </IconButton>
        </Box>,
      ]}
    />
  );
};
