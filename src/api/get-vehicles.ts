import { api } from '@/lib/axios';


export interface Vehicle {
  id: string;
  name: string;
  updatedAt: Date;
  licensePlate: string | null;
  ownerId: string;
  owner: {
      id: string;
      name: string | null;
  };
  latitude?: number;
  longitude?: number;
}

export interface GetVehiclesResponse {
  vehicles: Vehicle[]
}

export async function getVehicles() {
  const response = await api.get<GetVehiclesResponse>('/vehicles',)

  return response.data
}
