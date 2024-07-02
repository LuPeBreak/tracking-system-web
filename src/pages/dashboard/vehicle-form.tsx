import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createVehicle } from '@/api/create-vehicle'
import type { GetVehiclesResponse, Vehicle } from '@/api/get-vehicles'
import { updateVehicle } from '@/api/update-vehicle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/react-query'

const vehicleForm = z.object({
  id: z.string(),
  name: z.string(),
  licensePlate: z.string().nullable(),
})

type VehicleForm = z.infer<typeof vehicleForm>

interface VehicleFormProps {
  vehicle?: Vehicle
}

export function VehicleForm({ vehicle }: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VehicleForm>({
    defaultValues: {
      id: vehicle ? vehicle.id : '',
      licensePlate: vehicle ? vehicle.licensePlate : '',
      name: vehicle ? vehicle.name : '',
    },
  })

  function updateVehicleOnCache(
    vehicleId: string,
    name: string,
    licensePlate?: string,
  ) {
    const vehiclesListCache = queryClient.getQueriesData<GetVehiclesResponse>({
      queryKey: ['vehicles'],
    })

    vehiclesListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetVehiclesResponse>(cacheKey, {
        vehicles: cacheData.vehicles.map((vehicle) => {
          if (vehicle.id === vehicleId) {
            return licensePlate
              ? { ...vehicle, name, licensePlate }
              : { ...vehicle, name }
          }
          return vehicle
        }),
      })
    })
  }

  const { mutateAsync: updateVehicleFn } = useMutation({
    mutationFn: updateVehicle,
    async onSuccess(_, { vehicleId, name, licensePlate }) {
      updateVehicleOnCache(vehicleId, name, licensePlate || undefined)
    },
  })
  const { mutateAsync: createVehicleFn } = useMutation({
    mutationFn: createVehicle,
  })

  async function handleSaveVehicle(data: VehicleForm) {
    try {
      if (vehicle) {
        await updateVehicleFn({
          vehicleId: data.id,
          name: data.name,
          licensePlate: data.licensePlate,
        })
        toast.success('Veiculo atualizado com sucesso.')
        return
      }
      await createVehicleFn({
        name: data.name,
        licensePlate: data.licensePlate,
      })
      toast.success('Veiculo criado com sucesso.')
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      // location.reload()
    } catch (error) {
      toast.error('Erro ao salvar.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSaveVehicle)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Nome do Veiculo</Label>
        <Input id="email" type="text" {...register('name')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Placa do Veiculo</Label>
        <Input id="password" type="text" {...register('licensePlate')} />
      </div>
      <Button disabled={isSubmitting} className="w-full">
        Salvar Veiculo
      </Button>
    </form>
  )
}
