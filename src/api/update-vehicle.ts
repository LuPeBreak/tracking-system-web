import { api } from '@/lib/axios'

export interface RegisterBody {
  vehicleId: string
  name: string
  licensePlate: string | null
}

export async function updateVehicle({
  vehicleId,
  name,
  licensePlate,
}: RegisterBody) {
  await api.put(`/vehicles/${vehicleId}`, { name, licensePlate })
}
