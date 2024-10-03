import { RolAsignacion } from "../interfaces/interfaces";

const useComponenteHabilitado = (
  nombreComponente: string,
  asignaciones?: RolAsignacion[] | null
) => {
  if (!asignaciones || asignaciones?.length === 0)
    return { asignacionComponente: null };
  const asignacionComponente = asignaciones?.find(
    (acceso) => acceso.nombre === nombreComponente
  );
  return { asignacionComponente };
};

export default useComponenteHabilitado;
