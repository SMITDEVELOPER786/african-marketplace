"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Download,
  Upload,
  FileText,
  FileSpreadsheet,
  Filter,
  Copy,
  Eye,
  Grid3x3,
  List,
  Package,
  TrendingUp,
  AlertTriangle,
  Euro,
  X,
  CheckCircle2,
  Tag,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ImagePlus,
  Save,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { exportToPDF, exportToExcel, exportToWord } from "@/lib/export-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MerchantCatalogPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [bulkActionDialog, setBulkActionDialog] = useState<string | null>(null)
  const [bulkPrice, setBulkPrice] = useState("")
  const [bulkCategory, setBulkCategory] = useState("")
  const [bulkStatus, setBulkStatus] = useState("")

  const [editProduct, setEditProduct] = useState<any | null>(null)
  const [previewProduct, setPreviewProduct] = useState<any | null>(null)
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importPreview, setImportPreview] = useState<any[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const savedProducts = localStorage.getItem("merchant_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      const mockProducts = [
        {
          id: "1",
          name: "Huile de Palme Premium",
          sku: "OIL-001",
          category: "Huiles & Graisses",
          subcategory: "Huiles végétales",
          price: 24.99,
          stock: 45,
          weight: "1L",
          status: "active" as const,
          imageUrl: "/palm-oil-bottle.jpg",
          description: "Huile de palme rouge de première qualité, riche en vitamines et antioxydants.",
        },
        {
          id: "2",
          name: "Farine de Manioc",
          sku: "FLR-002",
          category: "Farines & Féculents",
          subcategory: "Farines",
          price: 12.99,
          stock: 120,
          weight: "1kg",
          status: "active" as const,
          imageUrl: "/cassava-flour-bag.jpg",
          description: "Farine de manioc 100% naturelle, sans gluten, idéale pour la pâtisserie.",
        },
        {
          id: "3",
          name: "Mélange d'Épices Africaines",
          sku: "SPC-003",
          category: "Épices & Assaisonnements",
          subcategory: "Mélanges",
          price: 8.99,
          stock: 5,
          weight: "250g",
          status: "low_stock" as const,
          imageUrl: "/african-spices-colorful.jpg",
          description: "Mélange authentique d'épices africaines pour sublimer vos plats.",
        },
        {
          id: "4",
          name: "Poisson Séché",
          sku: "FSH-004",
          category: "Poissons & Viandes Séchées",
          subcategory: "Poissons",
          price: 34.99,
          stock: 0,
          weight: "500g",
          status: "out_of_stock" as const,
          imageUrl: "/dried-fish-display.png",
          description: "Poisson séché traditionnel, parfait pour les soupes et ragoûts.",
        },
      ]
      setProducts(mockProducts)
      localStorage.setItem("merchant_products", JSON.stringify(mockProducts))
    }

    const mockCategories = [
      { id: "huiles", name: "Huiles & Graisses" },
      { id: "farines", name: "Farines & Féculents" },
      { id: "epices", name: "Épices & Assaisonnements" },
      { id: "poissons", name: "Poissons & Viandes Séchées" },
    ]
    setCategories(mockCategories)
  }, [])

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const lowStockProducts = products.filter((p) => p.status === "low_stock").length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  const handleEditProduct = (productId: string) => {
    router.push(`/merchant/products/${productId}/edit`)
  }

  const handleSaveEdit = () => {
    if (!editProduct) return

    const updatedProducts = products.map((p) => (p.id === editProduct.id ? editProduct : p))
    setProducts(updatedProducts)
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
    setEditProduct(null)
    toast({
      title: "Produit modifié",
      description: "Les modifications ont été enregistrées avec succès",
    })
  }

  const handlePreviewProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      setPreviewProduct(product)
    }
  }

  const handleDeleteProduct = (productId: string) => {
    setDeleteProductId(productId)
  }

  const confirmDelete = () => {
    if (!deleteProductId) return

    const updatedProducts = products.filter((p) => p.id !== deleteProductId)
    setProducts(updatedProducts)
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
    setDeleteProductId(null)
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé avec succès",
    })
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx,.xls"
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          try {
            const text = event.target.result
            const lines = text.split("\n")
            const headers = lines[0].split(",")
            const importedProducts = lines
              .slice(1)
              .filter((line: string) => line.trim())
              .map((line: string, index: number) => {
                const values = line.split(",")
                return {
                  id: `imported-${Date.now()}-${index}`,
                  name: values[0] || "",
                  sku: values[1] || "",
                  category: values[2] || "",
                  subcategory: values[3] || "",
                  price: Number.parseFloat(values[4]) || 0,
                  stock: Number.parseInt(values[5]) || 0,
                  weight: values[6] || "",
                  status: values[7] || "active",
                  description: values[8] || "",
                  imageUrl: "/placeholder.svg",
                }
              })

            setImportPreview(importedProducts)
            setShowImportDialog(true)
          } catch (error) {
            toast({
              title: "Erreur d'import",
              description: "Le fichier n'a pas pu être importé. Vérifiez le format.",
              variant: "destructive",
            })
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const confirmImport = () => {
    const updatedProducts = [...products, ...importPreview]
    setProducts(updatedProducts)
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
    setShowImportDialog(false)
    setImportPreview([])
    toast({
      title: "Import réussi",
      description: `${importPreview.length} produits ont été importés`,
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  useEffect(() => {
    setShowBulkActions(selectedProducts.length > 0)
  }, [selectedProducts])

  const handleBulkDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedProducts.length} produit(s) ?`)) {
      const updatedProducts = products.filter((p) => !selectedProducts.includes(p.id))
      setProducts(updatedProducts)
      localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
      setSelectedProducts([])
      toast({
        title: "Produits supprimés",
        description: `${selectedProducts.length} produit(s) ont été supprimés`,
      })
    }
  }

  const handleBulkDuplicate = () => {
    const productsToDuplicate = products.filter((p) => selectedProducts.includes(p.id))
    const duplicatedProducts = productsToDuplicate.map((p) => ({
      ...p,
      id: `${p.id}-copy-${Date.now()}`,
      name: `${p.name} (Copie)`,
      sku: `${p.sku}-COPY`,
    }))
    const updatedProducts = [...products, ...duplicatedProducts]
    setProducts(updatedProducts)
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
    setSelectedProducts([])
    toast({
      title: "Produits dupliqués",
      description: `${duplicatedProducts.length} produit(s) ont été dupliqués`,
    })
  }

  const handleBulkPriceUpdate = () => {
    if (!bulkPrice) return
    const updatedProducts = products.map((p) =>
      selectedProducts.includes(p.id) ? { ...p, price: Number.parseFloat(bulkPrice) } : p,
    )
    setProducts(updatedProducts)
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
    setSelectedProducts([])
    setBulkActionDialog(null)
    setBulkPrice("")
    toast({
      title: "Prix mis à jour",
      description: `Le prix de ${selectedProducts.length} produit(s) a été modifié`,
    })
  }

  const handleBulkCategoryUpdate = () => {
    if (!bulkCategory) return
    const categoryName = categories.find((c) => c.id === bulkCategory)?.name
    const updatedProducts = products.map((p) =>
      selectedProducts.includes(p.id) ? { ...p, category: categoryName || p.category } : p,
    )
    setProducts(updatedProducts)
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
    setSelectedProducts([])
    setBulkActionDialog(null)
    setBulkCategory("")
    toast({
      title: "Catégorie mise à jour",
      description: `La catégorie de ${selectedProducts.length} produit(s) a été modifiée`,
    })
  }

  const handleBulkStatusUpdate = () => {
    if (!bulkStatus) return
    const updatedProducts = products.map((p) => (selectedProducts.includes(p.id) ? { ...p, status: bulkStatus } : p))
    setProducts(updatedProducts)
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
    setSelectedProducts([])
    setBulkActionDialog(null)
    setBulkStatus("")
    toast({
      title: "Statut mis à jour",
      description: `Le statut de ${selectedProducts.length} produit(s) a été modifié`,
    })
  }

  const handleBulkExport = () => {
    const selectedProductsData = products.filter((p) => selectedProducts.includes(p.id))
    const exportData = selectedProductsData.map((p) => ({
      Nom: p.name,
      SKU: p.sku,
      Catégorie: p.category,
      "Sous-catégorie": p.subcategory,
      Prix: p.price,
      Stock: p.stock,
      Poids: p.weight,
      Statut: p.status,
    }))
    exportToExcel(exportData, "produits-selectionnes")
    toast({
      title: "Export réussi",
      description: `${selectedProducts.length} produit(s) ont été exportés`,
    })
  }

  const handleExportPDF = () => {
    const exportData = products.map((p) => ({
      Nom: p.name,
      SKU: p.sku,
      Catégorie: p.category,
      Prix: `€${p.price.toFixed(2)}`,
      Stock: `${p.stock} unités`,
      Statut: p.status === "active" ? "En stock" : p.status === "low_stock" ? "Stock faible" : "Rupture",
    }))
    exportToPDF(exportData, "catalogue-produits", "Catalogue des Produits")
    toast({
      title: "Export réussi",
      description: "Le catalogue a été exporté en PDF",
    })
  }

  const handleExportWord = () => {
    const exportData = products.map((p) => ({
      Nom: p.name,
      SKU: p.sku,
      Catégorie: p.category,
      Prix: `€${p.price.toFixed(2)}`,
      Stock: `${p.stock} unités`,
      Statut: p.status === "active" ? "En stock" : p.status === "low_stock" ? "Stock faible" : "Rupture",
    }))
    exportToWord(exportData, "catalogue-produits", "Catalogue des Produits")
    toast({
      title: "Export réussi",
      description: "Le catalogue a été exporté en Word",
    })
  }

  const handleExportExcel = () => {
    const exportData = products.map((p) => ({
      Nom: p.name,
      SKU: p.sku,
      Catégorie: p.category,
      "Sous-catégorie": p.subcategory,
      Prix: p.price,
      Stock: p.stock,
      Poids: p.weight,
      Statut: p.status,
    }))
    exportToExcel(exportData, "catalogue-produits")
    toast({
      title: "Export réussi",
      description: "Le catalogue a été exporté en Excel",
    })
  }

  const handleDuplicateProduct = (productId: string) => {
    const productToDuplicate = products.find((p) => p.id === productId)
    if (productToDuplicate) {
      const duplicatedProduct = {
        ...productToDuplicate,
        id: `${productId}-copy-${Date.now()}`,
        name: `${productToDuplicate.name} (Copie)`,
        sku: `${productToDuplicate.sku}-COPY`,
      }
      const updatedProducts = [...products, duplicatedProduct]
      setProducts(updatedProducts)
      localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))
      toast({
        title: "Produit dupliqué",
        description: "Le produit a été dupliqué avec succès",
      })
    }
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
      const matchesMinPrice = !minPrice || product.price >= Number.parseFloat(minPrice)
      const matchesMaxPrice = !maxPrice || product.price <= Number.parseFloat(maxPrice)
      return matchesSearch && matchesCategory && matchesStatus && matchesMinPrice && matchesMaxPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "stock-asc":
          return a.stock - b.stock
        case "stock-desc":
          return b.stock - a.stock
        default:
          return 0
      }
    })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedStatus, minPrice, maxPrice, sortBy])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToFirstPage = () => setCurrentPage(1)
  const goToLastPage = () => setCurrentPage(totalPages)
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(1, prev - 1))
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1))

  return (
    <div className="p-4 md:p-8"> {/* <-- FIX: Reduced padding on mobile */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Catalogue</h1> {/* <-- FIX: Responsive H1 */}
        <p className="mt-2 text-muted-foreground">Gérez vos produits et leur inventaire</p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 sm:p-6"> {/* <-- FIX: Reduced padding on mobile */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Produits</p>
                <p className="mt-2 text-2xl font-bold">{totalProducts}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6"> {/* <-- FIX: Reduced padding on mobile */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produits Actifs</p>
                <p className="mt-2 text-2xl font-bold">{activeProducts}</p>
                <p className="mt-1 text-xs text-green-600">
                  {totalProducts > 0 ? Math.round((activeProducts / totalProducts) * 100) : 0}% du total
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6"> {/* <-- FIX: Reduced padding on mobile */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stock Faible</p>
                <p className="mt-2 text-2xl font-bold">{lowStockProducts}</p>
                <p className="mt-1 text-xs text-orange-600">Nécessite attention</p>
              </div>
              <div className="rounded-full bg-orange-100 p-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6"> {/* <-- FIX: Reduced padding on mobile */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valeur Totale</p>
                <p className="mt-2 text-2xl font-bold">€{totalValue.toFixed(2)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Stock valorisé</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Euro className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher par nom, SKU..." /* <-- FIX: Shorter placeholder */
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-2 bg-transparent"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filtres
                    {(selectedCategory !== "all" || selectedStatus !== "all" || minPrice || maxPrice) && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                        {
                          [selectedCategory !== "all", selectedStatus !== "all", minPrice, maxPrice].filter(Boolean)
                            .length
                        }
                      </Badge>
                    )}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <TrendingUp className="h-4 w-4" />
                        Trier
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortBy("name")}>Nom (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-asc")}>Prix (croissant)</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price-desc")}>Prix (décroissant)</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("stock-asc")}>Stock (croissant)</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("stock-desc")}>Stock (décroissant)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex gap-1 rounded-md border">
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Exporter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={handleExportPDF} className="gap-2">
                      <FileText className="h-4 w-4" />
                      Exporter en PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportWord} className="gap-2">
                      <FileText className="h-4 w-4" />
                      Exporter en Word
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportExcel} className="gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Exporter en Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-2 bg-transparent" onClick={handleImport}>
                  <Upload className="h-4 w-4" />
                  Importer
                </Button>
                <Button className="gap-2" onClick={() => router.push("/merchant/products/new")}>
                  <Plus className="h-4 w-4" />
                  Ajouter un produit
                </Button>
              </div>

              {showFilters && (
                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">Filtres avancés</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("all")
                        setSelectedStatus("all")
                        setMinPrice("")
                        setMaxPrice("")
                      }}
                    >
                      Réinitialiser
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <Label>Catégorie</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les catégories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les catégories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Statut</Label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les statuts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="active">En stock</SelectItem>
                          <SelectItem value="low_stock">Stock faible</SelectItem>
                          <SelectItem value="out_of_stock">Rupture de stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Prix minimum (€)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Prix maximum (€)</Label>
                      <Input
                        type="number"
                        placeholder="999.99"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {showBulkActions && (
          <Card className="border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedProducts.length === filteredProducts.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="font-medium">{selectedProducts.length} produit(s) sélectionné(s)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => setBulkActionDialog("price")}
                  >
                    <Euro className="h-4 w-4" />
                    Modifier le prix
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => setBulkActionDialog("category")}
                  >
                    <Tag className="h-4 w-4" />
                    Changer catégorie
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                    onClick={() => setBulkActionDialog("status")}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Modifier statut
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleBulkDuplicate}>
                    <Copy className="h-4 w-4" />
                    Dupliquer
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleBulkExport}>
                    <Download className="h-4 w-4" />
                    Exporter
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-2" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => setSelectedProducts([])}>
                    <X className="h-4 w-4" />
                    Annuler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === "list" ? (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="w-12 p-4">
                        <Checkbox
                          checked={paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-4 text-left text-sm font-medium">Produit</th>
                      {/* === FIX 1: Hide columns on mobile === */}
                      <th className="hidden p-4 text-left text-sm font-medium md:table-cell">SKU</th>
                      <th className="hidden p-4 text-left text-sm font-medium md:table-cell">Catégorie</th>
                      <th className="p-4 text-left text-sm font-medium">Prix</th>
                      <th className="p-4 text-left text-sm font-medium">Stock</th>
                      <th className="hidden p-4 text-left text-sm font-medium md:table-cell">Poids</th>
                      <th className="p-4 text-left text-sm font-medium">Statut</th>
                      <th className="p-4 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Package className="h-12 w-12 text-muted-foreground" />
                            <p className="text-lg font-medium">Aucun produit trouvé</p>
                            <p className="text-sm text-muted-foreground">
                              Essayez de modifier vos filtres ou ajoutez un nouveau produit
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((product) => (
                        <tr
                          key={product.id}
                          className={`border-b last:border-0 ${selectedProducts.includes(product.id) ? "bg-primary/5" : ""}`}
                        >
                          <td className="p-4">
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                <img
                                  src={product.imageUrl || "/placeholder.svg"}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="text-sm sm:text-md font-medium">{product.name}</span>
                            </div>
                          </td>
                          {/* === FIX 1: Hide columns on mobile === */}
                          <td className="hidden p-4 font-mono text-sm text-muted-foreground md:table-cell">
                            {product.sku}
                          </td>
                          <td className="hidden p-4 md:table-cell">
                            <div className="flex flex-col">
                              <span className="text-sm">{product.category}</span>
                              <span className="text-xs text-muted-foreground">{product.subcategory}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm sm:text-md  font-medium">€{product.price.toFixed(2)}</td>
                          <td className="p-4">
                            <span
                              className={
                                product.stock === 0
                                  ? "text-destructive text-sm sm:text-md text-nowrap"
                                  : product.stock < 10
                                    ? "text-orange-600 text-sm sm:text-md text-nowrap"
                                    : "text-muted-foreground text-sm sm:text-md text-nowrap"
                              }
                            >
                              {product.stock} unités
                            </span>
                          </td>
                          {/* === FIX 1: Hide columns on mobile === */}
                          <td className="hidden p-4 text-sm text-muted-foreground md:table-cell">{product.weight}</td>
                          <td className="p-4">
                            <Badge
                            className="text-nowrap"
                              variant={
                                product.status === "active"
                                  ? "default"
                                  : product.status === "low_stock"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {product.status === "active"
                                ? "En stock"
                                : product.status === "low_stock"
                                  ? "Stock faible"
                                  : "Rupture"}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2" onClick={() => handleEditProduct(product.id)}>
                                  <Edit className="h-4 w-4" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2" onClick={() => handleDuplicateProduct(product.id)}>
                                  <Copy className="h-4 w-4" />
                                  Dupliquer
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2" onClick={() => handlePreviewProduct(product.id)}>
                                  <Eye className="h-4 w-4" />
                                  Prévisualiser
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="gap-2 text-destructive"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length > 0 && (
                <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-muted-foreground">Afficher</Label>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(Number.parseInt(value))
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger className="h-9 w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Affichage de {startIndex + 1} à {Math.min(endIndex, filteredProducts.length)} sur{" "}
                      {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* === FIX 2: Simplify pagination on mobile === */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hidden h-9 w-9 bg-transparent sm:inline-flex" /* <-- FIX: Hide on mobile */
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 bg-transparent"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber: number
                        if (totalPages <= 5) {
                          pageNumber = i + 1
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i
                        } else {
                          pageNumber = currentPage - 2 + i
                        }

                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => goToPage(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 bg-transparent"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hidden h-9 w-9 bg-transparent sm:inline-flex" /* <-- FIX: Hide on mobile */
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.length === 0 ? (
                <div className="col-span-full p-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium">Aucun produit trouvé</p>
                    <p className="text-sm text-muted-foreground">
                      Essayez de modifier vos filtres ou ajoutez un nouveau produit
                    </p>
                  </div>
                </div>
              ) : (
                paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`overflow-hidden ${selectedProducts.includes(product.id) ? "ring-2 ring-primary" : ""}`}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute left-2 top-2">
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                            className="bg-white"
                          />
                        </div>
                        <div className="absolute right-2 top-2">
                          <Badge
                            variant={
                              product.status === "active"
                                ? "default"
                                : product.status === "low_stock"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {product.status === "active"
                              ? "En stock"
                              : product.status === "low_stock"
                                ? "Stock faible"
                                : "Rupture"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground font-mono">{product.sku}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-lg font-bold">€{product.price.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Stock</p>
                            <p
                              className={`font-medium ${
                                product.stock === 0 ? "text-destructive" : product.stock < 10 ? "text-orange-600" : ""
                              }`}
                            >
                              {product.stock}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 bg-transparent"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                            Modifier
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2" onClick={() => handleDuplicateProduct(product.id)}>
                                <Copy className="h-4 w-4" />
                                Dupliquer
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2" onClick={() => handlePreviewProduct(product.id)}>
                                <Eye className="h-4 w-4" />
                                Prévisualiser
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="gap-2 text-destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {filteredProducts.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="hidden sm:flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm text-muted-foreground">Afficher</Label>
                        <Select
                          value={itemsPerPage.toString()}
                          onValueChange={(value) => {
                            setItemsPerPage(Number.parseInt(value))
                            setCurrentPage(1)
                          }}
                        >
                          <SelectTrigger className="h-9 w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Affichage de {startIndex + 1} à {Math.min(endIndex, filteredProducts.length)} sur{" "}
                        {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* === FIX 2: Simplify pagination on mobile === */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hidden h-9 w-9 bg-transparent sm:inline-flex" /* <-- FIX: Hide on mobile */
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 bg-transparent"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNumber: number
                          if (totalPages <= 5) {
                            pageNumber = i + 1
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i
                          } else {
                            pageNumber = currentPage - 2 + i
                          }

                          return (
                            <Button
                              key={pageNumber}
                              variant={currentPage === pageNumber ? "default" : "outline"}
                              size="icon"
                              className="h-9 w-9"
                              onClick={() => goToPage(pageNumber)}
                            >
                              {pageNumber}
                            </Button>
                          )
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 bg-transparent"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hidden h-9 w-9 bg-transparent sm:inline-flex" /* <-- FIX: Hide on mobile */
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* --- ALL DIALOGS (Modals) --- */}
      {/* In modals, 'sm:grid-cols-2' already handles responsiveness (stacks on mobile) */}
      {/* So, no major fixes are needed in the dialogs. */}

      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
            <DialogDescription>Modifiez les informations du produit</DialogDescription>
          </DialogHeader>
          {editProduct && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom du produit *</Label>
                  <Input
                    id="edit-name"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-sku">SKU *</Label>
                  <Input
                    id="edit-sku"
                    value={editProduct.sku}
                    onChange={(e) => setEditProduct({ ...editProduct, sku: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={editProduct.description || ""}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  placeholder="Décrivez votre produit..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Catégorie *</Label>
                  <Select
                    value={editProduct.category}
                    onValueChange={(value) => setEditProduct({ ...editProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-subcategory">Sous-catégorie</Label>
                  <Input
                    id="edit-subcategory"
                    value={editProduct.subcategory}
                    onChange={(e) => setEditProduct({ ...editProduct, subcategory: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Prix (€) *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-stock">Stock *</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) => setEditProduct({ ...editProduct, stock: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-weight">Poids/Volume</Label>
                  <Input
                    id="edit-weight"
                    value={editProduct.weight}
                    onChange={(e) => setEditProduct({ ...editProduct, weight: e.target.value })}
                    placeholder="Ex: 1kg, 500ml"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Statut</Label>
                <Select
                  value={editProduct.status}
                  onValueChange={(value) => setEditProduct({ ...editProduct, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">En stock</SelectItem>
                    <SelectItem value="low_stock">Stock faible</SelectItem>
                    <SelectItem value="out_of_stock">Rupture de stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Image du produit</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={editProduct.imageUrl || "/placeholder.svg"}
                      alt={editProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <ImagePlus className="h-4 w-4" />
                    Changer l'image
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProduct(null)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit} className="gap-2">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!previewProduct} onOpenChange={() => setPreviewProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu du produit</DialogTitle>
            <DialogDescription>Voici comment le produit apparaîtra aux clients</DialogDescription>
          </DialogHeader>
          {previewProduct && (
            <div className="space-y-6 py-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img
                    src={previewProduct.imageUrl || "/placeholder.svg"}
                    alt={previewProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Badge
                      variant={
                        previewProduct.status === "active"
                          ? "default"
                          : previewProduct.status === "low_stock"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {previewProduct.status === "active"
                        ? "En stock"
                        : previewProduct.status === "low_stock"
                          ? "Stock faible"
                          : "Rupture"}
                    </Badge>
                    <h2 className="mt-2 text-2xl font-bold">{previewProduct.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">SKU: {previewProduct.sku}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">€{previewProduct.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">/ {previewProduct.weight}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Catégorie</span>
                      <span className="font-medium">{previewProduct.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sous-catégorie</span>
                      <span className="font-medium">{previewProduct.subcategory}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Stock disponible</span>
                      <span
                        className={`font-medium ${
                          previewProduct.stock === 0
                            ? "text-destructive"
                            : previewProduct.stock < 10
                              ? "text-orange-600"
                              : ""
                        }`}
                      >
                        {previewProduct.stock} unités
                      </span>
                    </div>
                  </div>

                  {previewProduct.description && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Description</h3>
                      <p className="text-sm text-muted-foreground">{previewProduct.description}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button className="flex-1">Ajouter au panier</Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setPreviewProduct(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le produit sera définitivement supprimé de votre catalogue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu de l'import</DialogTitle>
            <DialogDescription>Vérifiez les {importPreview.length} produits avant de les importer</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium">Nom</th>
                    <th className="p-2 text-left text-sm font-medium">SKU</th>
                    <th className="p-2 text-left text-sm font-medium">Catégorie</th>
                    <th className="p-2 text-left text-sm font-medium">Prix</th>
                    <th className="p-2 text-left text-sm font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {importPreview.map((product, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 text-sm">{product.name}</td>
                      <td className="p-2 text-sm font-mono text-muted-foreground">{product.sku}</td>
                      <td className="p-2 text-sm">{product.category}</td>
                      <td className="p-2 text-sm">€{product.price.toFixed(2)}</td>
                      <td className="p-2 text-sm">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Annuler
            </Button>
            <Button onClick={confirmImport}>Importer {importPreview.length} produits</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={bulkActionDialog === "price"} onOpenChange={() => setBulkActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le prix en masse</DialogTitle>
            <DialogDescription>
              Définissez un nouveau prix pour les {selectedProducts.length} produit(s) sélectionné(s)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="bulk-price">Nouveau prix (€)</Label>
            <Input
              id="bulk-price"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={bulkPrice}
              onChange={(e) => setBulkPrice(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkActionDialog(null)}>
              Annuler
            </Button>
            <Button onClick={handleBulkPriceUpdate}>Appliquer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={bulkActionDialog === "category"} onOpenChange={() => setBulkActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer la catégorie en masse</DialogTitle>
            <DialogDescription>
              Sélectionnez une nouvelle catégorie pour les {selectedProducts.length} produit(s) sélectionné(s)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="bulk-category">Nouvelle catégorie</Label>
            <Select value={bulkCategory} onValueChange={setBulkCategory}>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkActionDialog(null)}>
              Annuler
            </Button>
            <Button onClick={handleBulkCategoryUpdate}>Appliquer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={bulkActionDialog === "status"} onOpenChange={() => setBulkActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le statut en masse</DialogTitle>
            <DialogDescription>
              Définissez un nouveau statut pour les {selectedProducts.length} produit(s) sélectionné(s)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="bulk-status">Nouveau statut</Label>
            <Select value={bulkStatus} onValueChange={setBulkStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">En stock</SelectItem>
                <SelectItem value="low_stock">Stock faible</SelectItem>
                <SelectItem value="out_of_stock">Rupture de stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkActionDialog(null)}>
              Annuler
            </Button>
            <Button onClick={handleBulkStatusUpdate}>Appliquer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}