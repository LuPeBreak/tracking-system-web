import { api } from '@/lib/axios'

export interface DeleteVehicleParams {
  name: string
  licensePlate: string | null
}

export async function createVehicle({
  name,
  licensePlate,
}: DeleteVehicleParams) {
  await api.post(`/vehicles`, { name, licensePlate })
}
