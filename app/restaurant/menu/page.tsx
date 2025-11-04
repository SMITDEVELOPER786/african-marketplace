"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Download,
  Upload,
  Edit,
  Trash2,
  UtensilsCrossed,
  ChefHat,
  Coffee,
  Dessert,
  Wine,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: string
  name: string
  description: string
  category: "entree" | "plat" | "dessert" | "boisson"
  price: number
  image?: string
  allergens: string[]
  available: boolean
  preparationTime: number
}

interface MenuFormula {
  id: string
  name: string
  description: string
  items: string[]
  price: number
  available: boolean
}

export default function RestaurantMenuPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isAddFormulaDialogOpen, setIsAddFormulaDialogOpen] = useState(false)

  // Sample data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Salade César",
      description: "Laitue romaine, poulet grillé, parmesan, croûtons, sauce César",
      category: "entree",
      price: 12.5,
      allergens: ["Gluten", "Lait", "Œufs"],
      available: true,
      preparationTime: 10,
    },
    {
      id: "2",
      name: "Poulet Yassa",
      description: "Poulet mariné aux oignons et citron, riz blanc",
      category: "plat",
      price: 18.0,
      allergens: [],
      available: true,
      preparationTime: 25,
    },
    {
      id: "3",
      name: "Tiramisu",
      description: "Dessert italien au café et mascarpone",
      category: "dessert",
      price: 7.5,
      allergens: ["Gluten", "Lait", "Œufs"],
      available: true,
      preparationTime: 5,
    },
  ])

  const [formulas, setFormulas] = useState<MenuFormula[]>([
    {
      id: "1",
      name: "Menu du Midi",
      description: "Entrée + Plat + Dessert",
      items: ["1", "2", "3"],
      price: 32.0,
      available: true,
    },
  ])

  const handleExportPDF = () => {
    toast({
      title: "Export en cours",
      description: "Le menu est en cours d'export en PDF...",
    })
  }

  const handleExportExcel = () => {
    toast({
      title: "Export en cours",
      description: "Le menu est en cours d'export en Excel...",
    })
  }

  const handleImport = () => {
    toast({
      title: "Import",
      description: "Fonctionnalité d'import à venir...",
    })
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "entree":
        return <ChefHat className="h-4 w-4" />
      case "plat":
        return <UtensilsCrossed className="h-4 w-4" />
      case "dessert":
        return <Dessert className="h-4 w-4" />
      case "boisson":
        return <Wine className="h-4 w-4" />
      default:
        return <Coffee className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "entree":
        return "Entrée"
      case "plat":
        return "Plat"
      case "dessert":
        return "Dessert"
      case "boisson":
        return "Boisson"
      default:
        return category
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Menu & Formules</h1>
            <p className="text-muted-foreground">Gérez votre carte et vos formules</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <Download className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>

        <Tabs defaultValue="items" className="space-y-4">
          <TabsList>
            <TabsTrigger value="items">Plats & Boissons</TabsTrigger>
            <TabsTrigger value="formulas">Formules</TabsTrigger>
          </TabsList>

          {/* Menu Items Tab */}
          <TabsContent value="items" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  <div className="flex-1">
                    <Label htmlFor="search">Rechercher</Label>
                    <div className="relative">
                      <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Nom du plat..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="entree">Entrées</SelectItem>
                        <SelectItem value="plat">Plats</SelectItem>
                        <SelectItem value="dessert">Desserts</SelectItem>
                        <SelectItem value="boisson">Boissons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setIsAddItemDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un plat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Menu Items Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <Badge variant="secondary">{getCategoryLabel(item.category)}</Badge>
                      </div>
                      <Badge variant={item.available ? "default" : "secondary"}>
                        {item.available ? "Disponible" : "Indisponible"}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-2xl">{item.price.toFixed(2)} €</span>
                        <span className="text-muted-foreground text-sm">{item.preparationTime} min</span>
                      </div>
                      {item.allergens.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen) => (
                            <Badge key={allergen} variant="outline" className="text-xs">
                              {allergen}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Edit className="mr-2 h-3 w-3" />
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Trash2 className="mr-2 h-3 w-3" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Formulas Tab */}
          <TabsContent value="formulas" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setIsAddFormulaDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une formule
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {formulas.map((formula) => (
                <Card key={formula.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <FileText className="h-5 w-5 text-primary" />
                      <Badge variant={formula.available ? "default" : "secondary"}>
                        {formula.available ? "Disponible" : "Indisponible"}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{formula.name}</CardTitle>
                    <CardDescription>{formula.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="font-semibold text-2xl text-primary">{formula.price.toFixed(2)} €</div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">Composition :</p>
                        <ul className="list-inside list-disc text-muted-foreground text-sm">
                          {formula.items.map((itemId) => {
                            const item = menuItems.find((i) => i.id === itemId)
                            return item ? <li key={itemId}>{item.name}</li> : null
                          })}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Edit className="mr-2 h-3 w-3" />
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Trash2 className="mr-2 h-3 w-3" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un plat</DialogTitle>
            <DialogDescription>Ajoutez un nouveau plat ou boisson à votre carte</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="item-name">Nom du plat</Label>
              <Input id="item-name" placeholder="Ex: Poulet Yassa" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="item-description">Description</Label>
              <Textarea id="item-description" placeholder="Décrivez le plat..." rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="item-category">Catégorie</Label>
                <Select>
                  <SelectTrigger id="item-category">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entree">Entrée</SelectItem>
                    <SelectItem value="plat">Plat</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="boisson">Boisson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="item-price">Prix (€)</Label>
                <Input id="item-price" type="number" step="0.01" placeholder="0.00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="item-prep-time">Temps de préparation (min)</Label>
                <Input id="item-prep-time" type="number" placeholder="15" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="item-allergens">Allergènes</Label>
                <Input id="item-allergens" placeholder="Gluten, Lait..." />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Plat ajouté",
                  description: "Le plat a été ajouté avec succès",
                })
                setIsAddItemDialogOpen(false)
              }}
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Formula Dialog */}
      <Dialog open={isAddFormulaDialogOpen} onOpenChange={setIsAddFormulaDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une formule</DialogTitle>
            <DialogDescription>Créez une nouvelle formule pour votre restaurant</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="formula-name">Nom de la formule</Label>
              <Input id="formula-name" placeholder="Ex: Menu du Midi" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="formula-description">Description</Label>
              <Input id="formula-description" placeholder="Ex: Entrée + Plat + Dessert" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="formula-price">Prix (€)</Label>
              <Input id="formula-price" type="number" step="0.01" placeholder="0.00" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFormulaDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Formule ajoutée",
                  description: "La formule a été ajoutée avec succès",
                })
                setIsAddFormulaDialogOpen(false)
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
