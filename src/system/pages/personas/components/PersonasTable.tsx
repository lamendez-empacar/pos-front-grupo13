import { useMemo } from "react";
import { ExportToCsv } from "export-to-csv";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Edit, FileDownload } from "@mui/icons-material";
import { PersonaBase } from "../../../../interfaces/interfaces";
import { IconoHabilitado } from "../../../../components";

interface Props {
  allowUpdate: boolean;
  personas: PersonaBase[];
  handleOpen: (aplicacion_id: number) => void;
  handleHabilitar: (aplicacion_id: number) => void;
}

const csvOptions = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  title: "Personas",
  filename: `${import.meta.env.VITE_CODIGO_APP} Personas`,
  headers: [
    "Codigo",
    "Nombre",
    "Ap. Paterno",
    "Ap. Materno",
    "Cargo",
    "Usuario",
    "Ubicacion",
  ],
};

const csvExporter = new ExportToCsv(csvOptions);

export const PersonasTable = ({
  allowUpdate,
  personas,
  handleHabilitar,
  handleOpen,
}: Props) => {
  const columns = useMemo<MRT_ColumnDef<PersonaBase>[]>(
    () => [
      {
        accessorKey: "codigo",
        header: "Codigo",
      },
      {
        accessorKey: "nombre_completo",
        header: "Nombre",
      },
      {
        accessorKey: "cargo",
        header: "Cargo",
      },
      {
        accessorFn: (row) => (row?.user ? row.user.name : ""),
        header: "Usuario",
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
    [personas]
  );

  const handleExportSelectedRows = (rows: MRT_Row<PersonaBase>[]) => {
    csvExporter.generateCsv(
      rows.map((row) => {
        return {
          codigo: row.original.codigo,
          nombre: row.original.nombre,
          apellido_paterno: row.original.apellido_paterno,
          apellido_materno: row.original.apellido_materno,
          cargo: row.original.cargo,
          user: row.original.user ? row.original.user.name : "",
          ubicacion: row.original.ubicacion,
        };
      })
    );
  };

  const handleExportFullData = () => {
    csvExporter.generateCsv(getMappedData());
  };

  const getMappedData = () => {
    if (personas.length === 0) return [];
    return personas.map((p) => {
      return {
        codigo: p.codigo,
        nombre: p.nombre,
        apellido_paterno: p.apellido_paterno,
        apellido_materno: p.apellido_materno,
        cargo: p.cargo,
        user: p.user ? p.user.name : "",
        ubicacion: p.ubicacion,
      };
    });
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={personas}
      localization={MRT_Localization_ES}
      enableRowSelection
      enableRowActions={allowUpdate}
      positionActionsColumn="last"
      initialState={{ density: "compact" }}
      defaultColumn={{
        size: 50,
      }}
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
        >
          <Button
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportFullData}
            startIcon={<FileDownload />}
            variant="outlined"
          >
            Exportar todos los datos
          </Button>

          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() =>
              handleExportSelectedRows(table.getSelectedRowModel().rows)
            }
            startIcon={<FileDownload />}
            variant="outlined"
          >
            Exportar filas seleccionadas
          </Button>
        </Box>
      )}
      renderRowActions={({ row }) => [
        <Box
          sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}
          key={row.id}
        >
          <IconButton
            color="warning"
            onClick={() => handleHabilitar(row.original.persona_id)}
          >
            <IconoHabilitado habilitado={row.original.habilitado} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleOpen(row.original.persona_id)}
          >
            <Edit />
          </IconButton>
        </Box>,
      ]}
    />
  );
};
