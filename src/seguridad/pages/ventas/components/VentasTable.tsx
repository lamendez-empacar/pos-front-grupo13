import { Box, IconButton } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Venta } from "../../../../interfaces/interfaces";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Edit } from "@mui/icons-material";

interface Props {
  allowUpdate: boolean;
  ventas: Venta[];
  handleOpen: (id: number) => void;
}

export const VentasTable = ({ allowUpdate, ventas, handleOpen }: Props) => {
  const columns = useMemo<MRT_ColumnDef<Venta>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "cliente_name",
        header: "Cliente",
      },
      {
        accessorKey: "total",
        header: "Monto",
      },
    ],
    [ventas]
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={ventas}
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
