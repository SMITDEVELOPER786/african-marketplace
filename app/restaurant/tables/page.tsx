"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users, LayoutGrid } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Table {
  id: string
  number: number
  capacity: number
  status: "disponible" | "occupee" | "reservee"
  zone: "terrasse" | "salle" | "vip"
}

export default function RestaurantTablesPage() {
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [tables, setTables] = useState<Table[]>([
    { id: "1", number: 1, capacity: 2, status: "disponible", zone: "salle" },
    { id: "2", number: 2, capacity: 4, status: "occupee", zone: "salle" },
    { id: "3", number: 3, capacity: 4, status: "reservee", zone: "salle" },
    { id: "4", number: 4, capacity: 6, status: "disponible", zone: "salle" },
    { id: "5", number: 5, capacity: 2, status: "disponible", zone: "terrasse" },
    { id: "6", number: 6, capacity: 4, status: "occupee", zone: "terrasse" },
    { id: "7", number: 7, capacity: 8, status: "disponible", zone: "vip" },
  ])

  const handleChangeStatus = (tableId: string, newStatus: Table["status"]) => {
    setTables(tables.map((table) => (table.id === tableId ? { ...table, status: newStatus } : table)))
    toast({
      title: "Statut mis à jour",
      description: `La table a été marquée comme "${newStatus}"`,
    })
  }

  const handleDelete = (tableId: string) => {
    setTables(tables.filter((table) => table.id !== tableId))
    toast({
      title: "Table supprimée",
      description: "La table a été supprimée avec succès",
    })
  }

  const getStatusBadge = (status: Table["status"]) => {
    const variants: Record<Table["status"], { variant: "default" | "secondary" | "destructive"; label: string }> = {
      disponible: { variant: "default", label: "Disponible" },
      occupee: { variant: "destructive", label: "Occupée" },
      reservee: { variant: "secondary", label: "Réservée" },
    }
    return variants[status]
  }

  const getZoneLabel = (zone: Table["zone"]) => {
    const labels: Record<Table["zone"], string> = {
      salle: "Salle principale",
      terrasse: "Terrasse",
      vip: "Espace VIP",
    }
    return labels[zone]
  }

  const tablesByZone = {
    salle: tables.filter((t) => t.zone === "salle"),
    terrasse: tables.filter((t) => t.zone === "terrasse"),
    vip: tables.filter((t) => t.zone === "vip"),
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Gestion des Tables</h1>
            <p className="text-muted-foreground">Gérez le plan de salle de votre restaurant</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une table
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total tables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl">{tables.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl text-green-600">
                {tables.filter((t) => t.status === "disponible").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Occupées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl text-red-600">
                {tables.filter((t) => t.status === "occupee").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Réservées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-3xl text-orange-600">
                {tables.filter((t) => t.status === "reservee").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables by Zone */}
        {Object.entries(tablesByZone).map(([zone, zoneTables]) => (
          <div key={zone} className="space-y-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              <h2 className="font-semibold text-xl">{getZoneLabel(zone as Table["zone"])}</h2>
              <Badge variant="secondary">{zoneTables.length} tables</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {zoneTables.map((table) => (
                <Card key={table.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-2xl">Table {table.number}</p>
                        <div className="mt-1 flex items-center gap-1 text-muted-foreground text-sm">
                          <Users className="h-4 w-4" />
                          <span>{table.capacity} places</span>
                        </div>
                      </div>
                      <Badge {...getStatusBadge(table.status)}>{getStatusBadge(table.status).label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      {table.status === "disponible" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleChangeStatus(table.id, "occupee")}
                          >
                            Occuper
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleChangeStatus(table.id, "reservee")}
                          >
                            Réserver
                          </Button>
                        </>
                      )}
                      {table.status === "occupee" && (
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleChangeStatus(table.id, "disponible")}
                        >
                          Libérer
                        </Button>
                      )}
                      {table.status === "reservee" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleChangeStatus(table.id, "occupee")}
                          >
                            Occuper
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleChangeStatus(table.id, "disponible")}
                          >
                            Annuler
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Edit className="mr-2 h-3 w-3" />
                        Modifier
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleDelete(table.id)}>
                        <Trash2 className="mr-2 h-3 w-3" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Table Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une table</DialogTitle>
            <DialogDescription>Ajoutez une nouvelle table à votre restaurant</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="table-number">Numéro de table</Label>
              <Input id="table-number" type="number" placeholder="1" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="table-capacity">Capacité (nombre de places)</Label>
              <Input id="table-capacity" type="number" placeholder="4" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="table-zone">Zone</Label>
              <select
                id="table-zone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="salle">Salle principale</option>
                <option value="terrasse">Terrasse</option>
                <option value="vip">Espace VIP</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Table ajoutée",
                  description: "La table a été ajoutée avec succès",
                })
                setIsAddDialogOpen(false)
              }}
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
