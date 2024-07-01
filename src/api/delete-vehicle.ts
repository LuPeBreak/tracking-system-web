import { api } from '@/lib/axios'

export interface DeleteVehicleParams {
  vehicleId: string
}

export async function deleteVehicle({ vehicleId }: DeleteVehicleParams) {
  await api.delete(`/vehicles/${vehicleId}`)
}
