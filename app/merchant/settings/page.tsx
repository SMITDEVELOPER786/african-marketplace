"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Store,
  CreditCard,
  Truck,
  FolderTree,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock categories data
const initialCategories = [
  {
    id: "1",
    name: "Huiles & Graisses",
    description: "Huiles végétales et graisses alimentaires",
    subcategories: [
      { id: "1-1", name: "Huiles végétales" },
      { id: "1-2", name: "Beurres" },
      { id: "1-3", name: "Graisses animales" },
    ],
    productCount: 12,
  },
  {
    id: "2",
    name: "Farines & Féculents",
    description: "Farines, semoules et féculents",
    subcategories: [
      { id: "2-1", name: "Farines" },
      { id: "2-2", name: "Semoules" },
      { id: "2-3", name: "Féculents" },
    ],
    productCount: 24,
  },
  {
    id: "3",
    name: "Épices & Assaisonnements",
    description: "Épices, herbes et mélanges d'assaisonnement",
    subcategories: [
      { id: "3-1", name: "Épices simples" },
      { id: "3-2", name: "Mélanges" },
      { id: "3-3", name: "Herbes" },
    ],
    productCount: 18,
  },
  {
    id: "4",
    name: "Poissons & Viandes Séchés",
    description: "Poissons, viandes et fruits de mer séchés",
    subcategories: [
      { id: "4-1", name: "Poissons" },
      { id: "4-2", name: "Viandes" },
      { id: "4-3", name: "Fruits de mer" },
    ],
    productCount: 15,
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "Ma Boutique Africaine",
    storeEmail: "contact@maboutique.com",
    storePhone: "+33 1 23 45 67 89",
    storeAddress: "123 Rue de la République, 75001 Paris",
    storeDescription: "Produits africains authentiques",
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockAlerts: true,
    reviewNotifications: true,
  })

  const [categories, setCategories] = useState(initialCategories)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isAddSubcategoryOpen, setIsAddSubcategoryOpen] = useState(false)
  const [selectedParentCategory, setSelectedParentCategory] = useState("")
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [newSubcategory, setNewSubcategory] = useState("")

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCat = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
        subcategories: [],
        productCount: 0,
      }
      setCategories([...categories, newCat])
      setNewCategory({ name: "", description: "" })
      setIsAddCategoryOpen(false)
    }
  }

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() && selectedParentCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedParentCategory
            ? {
                ...cat,
                subcategories: [...cat.subcategories, { id: `${cat.id}-${Date.now()}`, name: newSubcategory }],
              }
            : cat,
        ),
      )
      setNewSubcategory("")
      setIsAddSubcategoryOpen(false)
      setSelectedParentCategory("")
    }
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.filter((sub) => sub.id !== subcategoryId),
            }
          : cat,
      ),
    )
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="mt-2 text-muted-foreground">Configurez votre boutique et vos préférences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Store className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="categories" className="gap-2">
            <FolderTree className="h-4 w-4" />
            Catégories
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Paiement
          </TabsTrigger>
          <TabsTrigger value="shipping" className="gap-2">
            <Truck className="h-4 w-4" />
            Livraison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de la boutique</CardTitle>
              <CardDescription>Gérez les informations de base de votre boutique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="storeName">Nom de la boutique</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="storeDescription">Description</Label>
                <Textarea
                  id="storeDescription"
                  value={settings.storeDescription}
                  onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="storePhone">Téléphone</Label>
                  <Input
                    id="storePhone"
                    value={settings.storePhone}
                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="storeAddress">Adresse</Label>
                <Input
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                />
              </div>

              <Button>Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestion des catégories</CardTitle>
                  <CardDescription>Créez et organisez vos catégories et sous-catégories de produits</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isAddSubcategoryOpen} onOpenChange={setIsAddSubcategoryOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Plus className="h-4 w-4" />
                        Sous-catégorie
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter une sous-catégorie</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="parent-category">Catégorie parente</Label>
                          <Select value={selectedParentCategory} onValueChange={setSelectedParentCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="subcategory-name">Nom de la sous-catégorie</Label>
                          <Input
                            id="subcategory-name"
                            placeholder="Ex: Huiles végétales"
                            value={newSubcategory}
                            onChange={(e) => setNewSubcategory(e.target.value)}
                          />
                        </div>
                        <Button className="w-full" onClick={handleAddSubcategory}>
                          Ajouter la sous-catégorie
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Catégorie
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="category-name">Nom de la catégorie</Label>
                          <Input
                            id="category-name"
                            placeholder="Ex: Épices & Assaisonnements"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category-description">Description</Label>
                          <Textarea
                            id="category-description"
                            placeholder="Description de la catégorie..."
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                          />
                        </div>
                        <Button className="w-full" onClick={handleAddCategory}>
                          Créer la catégorie
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="rounded-lg border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex flex-1 items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleCategory(category.id)}
                        >
                          {expandedCategories.includes(category.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <FolderTree className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{category.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {category.productCount} produits
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {category.subcategories.length} sous-catégories
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {expandedCategories.includes(category.id) && category.subcategories.length > 0 && (
                      <div className="border-t bg-muted/30 p-4">
                        <div className="space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <div
                              key={subcategory.id}
                              className="flex items-center justify-between rounded-md bg-background p-3"
                            >
                              <div className="flex items-center gap-2">
                                <div className="ml-8 h-px w-4 bg-border" />
                                <span className="text-sm">{subcategory.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifications SMS</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications par SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nouvelles commandes</Label>
                  <p className="text-sm text-muted-foreground">Être notifié des nouvelles commandes</p>
                </div>
                <Switch
                  checked={settings.orderNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, orderNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertes de stock faible</Label>
                  <p className="text-sm text-muted-foreground">Être alerté quand le stock est faible</p>
                </div>
                <Switch
                  checked={settings.lowStockAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, lowStockAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nouveaux avis</Label>
                  <p className="text-sm text-muted-foreground">Être notifié des nouveaux avis clients</p>
                </div>
                <Switch
                  checked={settings.reviewNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, reviewNotifications: checked })}
                />
              </div>

              <Button>Enregistrer les préférences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Méthodes de paiement</CardTitle>
              <CardDescription>Configurez vos options de paiement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les paiements ne sont pas activés pour ce marketplace. Les clients peuvent uniquement faire des
                réservations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Options de livraison</CardTitle>
              <CardDescription>Configurez vos zones et tarifs de livraison</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les options de livraison seront configurées prochainement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
