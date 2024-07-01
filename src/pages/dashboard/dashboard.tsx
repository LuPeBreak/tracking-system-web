import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getVehicles } from '@/api/get-vehicles'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { VehicleTableRow } from './vehicle-table-row'
import { VehicleTableSkeleton } from './vehicle-table-skeletons'

export function Dashboard() {
  const { data: result, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles(),
  })

  return (
    <>
      <Helmet title="Veículos" />
      <div className="flex flex-col gap-4">
        <h1 className="font-bol text-3xl tracking-tight">Veículos</h1>

        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
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
