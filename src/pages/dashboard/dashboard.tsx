import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getVehicles } from '@/api/get-vehicles'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { VehicleForm } from './vehicle-form'
import { VehicleTableRow } from './vehicle-table-row'
import { VehicleTableSkeleton } from './vehicle-table-skeletons'

export function Dashboard() {
  const [isCreateVehicleOpen, setIsCreateVehicleOpen] = useState(false)
  const { data: result, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles(),
  })

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-bol text-3xl tracking-tight">Veículos</h1>
          <Dialog
            open={isCreateVehicleOpen}
            onOpenChange={setIsCreateVehicleOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-4">
                <Plus className="h-3 w-3" />
                <span>Adicionar veiculo</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Veiculo</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <VehicleForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Nome</TableHead>
                  <TableHead className="w-[140px]">Placa</TableHead>
                  <TableHead className="w-[180px]">Atualizado Há</TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingVehicles && <VehicleTableSkeleton />}

                {result &&
                  result.vehicles.map((vehicle) => {
                    return (
                      <VehicleTableRow key={vehicle.id} vehicle={vehicle} />
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
