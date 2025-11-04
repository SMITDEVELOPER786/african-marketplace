"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Trash2, Languages, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LabelTranslation {
  id: string
  key: string
  category: string
  fr: string
  en: string
  es: string
  ar: string
}

const mockLabels: LabelTranslation[] = [
  {
    id: "1",
    key: "common.welcome",
    category: "common",
    fr: "Bienvenue",
    en: "Welcome",
    es: "Bienvenido",
    ar: "مرحبا",
  },
  {
    id: "2",
    key: "common.search",
    category: "common",
    fr: "Rechercher",
    en: "Search",
    es: "Buscar",
    ar: "بحث",
  },
  {
    id: "3",
    key: "auth.login",
    category: "auth",
    fr: "Se connecter",
    en: "Login",
    es: "Iniciar sesión",
    ar: "تسجيل الدخول",
  },
  {
    id: "4",
    key: "auth.register",
    category: "auth",
    fr: "S'inscrire",
    en: "Register",
    es: "Registrarse",
    ar: "التسجيل",
  },
  {
    id: "5",
    key: "business.name",
    category: "business",
    fr: "Nom du commerce",
    en: "Business name",
    es: "Nombre del negocio",
    ar: "اسم العمل",
  },
  {
    id: "6",
    key: "business.description",
    category: "business",
    fr: "Description",
    en: "Description",
    es: "Descripción",
    ar: "وصف",
  },
  {
    id: "7",
    key: "order.total",
    category: "order",
    fr: "Total",
    en: "Total",
    es: "Total",
    ar: "المجموع",
  },
  {
    id: "8",
    key: "order.status",
    category: "order",
    fr: "Statut",
    en: "Status",
    es: "Estado",
    ar: "الحالة",
  },
]

export default function LabelsSettingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [labels, setLabels] = useState<LabelTranslation[]>(mockLabels)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<LabelTranslation | null>(null)
  const [newLabel, setNewLabel] = useState({
    key: "",
    category: "common",
    fr: "",
    en: "",
    es: "",
    ar: "",
  })

  const categories = ["common", "auth", "business", "order", "payment", "notification"]

  const filteredLabels = labels.filter((label) => {
    if (categoryFilter !== "all" && label.category !== categoryFilter) return false
    if (
      searchQuery &&
      !label.key.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !label.fr.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !label.en.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    return true
  })

  const handleEdit = (label: LabelTranslation) => {
    setSelectedLabel(label)
    setEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    if (selectedLabel) {
      setLabels(labels.map((l) => (l.id === selectedLabel.id ? selectedLabel : l)))
      setEditModalOpen(false)
      setSelectedLabel(null)
    }
  }

  const handleAddLabel = () => {
    const newId = (labels.length + 1).toString()
    setLabels([...labels, { id: newId, ...newLabel }])
    setAddModalOpen(false)
    setNewLabel({
      key: "",
      category: "common",
      fr: "",
      en: "",
      es: "",
      ar: "",
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce libellé ?")) {
      setLabels(labels.filter((l) => l.id !== id))
    }
  }

  const getCategoryCount = (category: string) => {
    return labels.filter((l) => l.category === category).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Libellés</h1>
          <p className="text-sm text-muted-foreground">Gérez tous les textes et traductions de l'application</p>
        </div>
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un libellé
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Libellés</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{labels.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Langues</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">FR, EN, ES, AR</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catégories</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complétude</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Toutes les traductions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par clé ou texte..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)} ({getCategoryCount(cat)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Labels Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-3 text-left text-sm font-medium">Clé</th>
                  <th className="p-3 text-left text-sm font-medium">Catégorie</th>
                  <th className="p-3 text-left text-sm font-medium">Français</th>
                  <th className="p-3 text-left text-sm font-medium">English</th>
                  <th className="p-3 text-left text-sm font-medium">Español</th>
                  <th className="p-3 text-left text-sm font-medium">العربية</th>
                  <th className="p-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLabels.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-muted-foreground">
                      Aucun libellé trouvé
                    </td>
                  </tr>
                ) : (
                  filteredLabels.map((label) => (
                    <tr key={label.id} className="border-b last:border-0">
                      <td className="p-3 font-mono text-xs">{label.key}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {label.category}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{label.fr}</td>
                      <td className="p-3 text-sm">{label.en}</td>
                      <td className="p-3 text-sm">{label.es}</td>
                      <td className="p-3 text-sm">{label.ar}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(label)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(label.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le libellé</DialogTitle>
            <DialogDescription>Modifiez les traductions pour toutes les langues</DialogDescription>
          </DialogHeader>
          {selectedLabel && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Clé</Label>
                <Input value={selectedLabel.key} disabled className="font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select
                  value={selectedLabel.category}
                  onValueChange={(value) => setSelectedLabel({ ...selectedLabel, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-fr">Français</Label>
                  <Input
                    id="edit-fr"
                    value={selectedLabel.fr}
                    onChange={(e) => setSelectedLabel({ ...selectedLabel, fr: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-en">English</Label>
                  <Input
                    id="edit-en"
                    value={selectedLabel.en}
                    onChange={(e) => setSelectedLabel({ ...selectedLabel, en: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-es">Español</Label>
                  <Input
                    id="edit-es"
                    value={selectedLabel.es}
                    onChange={(e) => setSelectedLabel({ ...selectedLabel, es: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ar">العربية</Label>
                  <Input
                    id="edit-ar"
                    value={selectedLabel.ar}
                    onChange={(e) => setSelectedLabel({ ...selectedLabel, ar: e.target.value })}
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit}>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajouter un libellé</DialogTitle>
            <DialogDescription>Créez un nouveau libellé avec ses traductions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-key">Clé</Label>
              <Input
                id="new-key"
                placeholder="ex: common.save"
                className="font-mono text-xs"
                value={newLabel.key}
                onChange={(e) => setNewLabel({ ...newLabel, key: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-category">Catégorie</Label>
              <Select
                value={newLabel.category}
                onValueChange={(value) => setNewLabel({ ...newLabel, category: value })}
              >
                <SelectTrigger id="new-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-fr">Français</Label>
                <Input
                  id="new-fr"
                  value={newLabel.fr}
                  onChange={(e) => setNewLabel({ ...newLabel, fr: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-en">English</Label>
                <Input
                  id="new-en"
                  value={newLabel.en}
                  onChange={(e) => setNewLabel({ ...newLabel, en: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-es">Español</Label>
                <Input
                  id="new-es"
                  value={newLabel.es}
                  onChange={(e) => setNewLabel({ ...newLabel, es: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-ar">العربية</Label>
                <Input
                  id="new-ar"
                  value={newLabel.ar}
                  onChange={(e) => setNewLabel({ ...newLabel, ar: e.target.value })}
                  dir="rtl"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddModalOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddLabel} disabled={!newLabel.key || !newLabel.fr}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
