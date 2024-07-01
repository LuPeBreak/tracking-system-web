import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { Vehicle } from '@/api/get-vehicles'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/ui/table'


export interface VehicleDetailsProps {
  vehicle: Vehicle
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Veiculo: {vehicle.name}</DialogTitle>
        <DialogDescription>Detalhes do veiculo</DialogDescription>
      </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Nome</TableCell>
                <TableCell className="flex justify-end">
                  {vehicle.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Placa</TableCell>
                <TableCell className="flex justify-end">
                  {vehicle.licensePlate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Responsável</TableCell>
                <TableCell className="flex justify-end">
                  {vehicle.owner.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Latitude</TableCell>
                <TableCell className="flex justify-end">
                  {vehicle.latitude}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Longitude</TableCell>
                <TableCell className="flex justify-end">
                  {vehicle.longitude}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Localização atualizada
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(vehicle.updatedAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className='flex flex-col items-center justify-center space-y-4'>
            <h3>Localização</h3>
            <p>MAPA</p> {/** TODO MAPS WITH LOCATION */}
          </div>

        </div>
       
    </DialogContent>
  )
}
