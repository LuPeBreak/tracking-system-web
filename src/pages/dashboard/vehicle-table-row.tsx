import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil, Search, X } from 'lucide-react'
import { useState } from 'react'

import { deleteVehicle } from '@/api/delete-vehicle'
import { type GetVehiclesResponse, Vehicle } from '@/api/get-vehicles'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'

import { VehicleDetails } from './vehicle-details'
import { VehicleForm } from './vehicle-form'

interface VehicleTableRowProps {
  vehicle: Vehicle
}

export function VehicleTableRow({ vehicle }: VehicleTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  function removeVehicleOnCache(vehicleId: string) {
    const vehiclesListCache = queryClient.getQueriesData<GetVehiclesResponse>({
      queryKey: ['vehicles'],
    })

    vehiclesListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetVehiclesResponse>(cacheKey, {
        vehicles: cacheData.vehicles.filter((vehicle) => {
          if (vehicle.id === vehicleId) {
            return false
          }
          return true
        }),
      })
    })
  }

  const { mutateAsync: deleteVehicleFn, isPending: isDeletingVehicle } =
    useMutation({
      mutationFn: deleteVehicle,
      async onSuccess(_, { vehicleId }) {
        removeVehicleOnCache(vehicleId)
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <VehicleDetails vehicle={vehicle} />
        </Dialog>
      </TableCell>

      <TableCell>{vehicle.name}</TableCell>
      <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(vehicle.updatedAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="space-x-4">
        <Button
          disabled={isDeletingVehicle}
          onClick={() => deleteVehicleFn({ vehicleId: vehicle.id })}
          size="icon"
          variant="outline"
        >
          <X className="size-4" />
          <span className="sr-only">Deletar Veiculo</span>
        </Button>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon">
              <Pencil className="h-3 w-3" />
              <span className="sr-only">Atualizar Veiculo</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Atualizar Veiculo</SheetTitle>
            </SheetHeader>

            <div className="py-4">
              <VehicleForm vehicle={vehicle} />
            </div>
          </SheetContent>
        </Sheet>
      </TableCell>
    </TableRow>
  )
}
