import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

import { Vehicle } from '@/api/get-vehicles'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { VehicleDetails } from './vehicle-details'

interface VehicleTableRowProps {
  vehicle: Vehicle
}

export function VehicleTableRow({ vehicle }: VehicleTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

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
      <TableCell className="font-mono text-xs font-medium">
        {vehicle.id}
      </TableCell>
      
      <TableCell>
        {vehicle.name}
      </TableCell>
      <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(vehicle.updatedAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <Button
          // disabled={}
          // onClick={() => }
          variant="ghost"
          size="icon"
        >
          <X className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </TableCell>
    </TableRow>
  )
}
