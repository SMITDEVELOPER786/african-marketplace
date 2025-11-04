"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, Plus, Trash2, Camera, Percent, Euro, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    barcode: "",
    brand: "",
    origin: "",
    tags: [] as string[],
    images: [] as string[],
    price: "",
    comparePrice: "",
    costPrice: "",
    sku: "",
    stock: "",
    lowStockThreshold: "10",
    weight: "",
    dimensions: "",
    variants: [] as any[],
    metaTitle: "",
    metaDescription: "",
    slug: "",
    visibility: "active",
    featured: false,
    allowReservations: false,
    promotionType: "none" as "none" | "fixed" | "percentage",
    promotionValue: "",
  })

  const [newTag, setNewTag] = useState("")
  const [newVariant, setNewVariant] = useState({
    color: "",
    size: "",
    sku: "",
    stock: "",
    price: "",
  })

  const categories = [
    {
      id: "huiles",
      name: "Huiles & Graisses",
      subcategories: ["Huiles végétales", "Huiles essentielles", "Beurres", "Graisses animales"],
    },
    {
      id: "farines",
      name: "Farines & Féculents",
      subcategories: ["Farines", "Semoules", "Féculents", "Pâtes"],
    },
    {
      id: "epices",
      name: "Épices & Assaisonnements",
      subcategories: ["Épices simples", "Mélanges", "Herbes", "Condiments"],
    },
    {
      id: "poissons",
      name: "Poissons & Viandes Séchées",
      subcategories: ["Poissons", "Viandes", "Fruits de mer", "Charcuterie"],
    },
    {
      id: "cereales",
      name: "Céréales & Légumineuses",
      subcategories: ["Riz", "Maïs", "Haricots", "Lentilles"],
    },
  ]

  const selectedCategory = categories.find((cat) => cat.name === formData.category)

  useEffect(() => {
    // Load product data from localStorage
    const savedProducts = localStorage.getItem("merchant_products")
    if (savedProducts) {
      const products = JSON.parse(savedProducts)
      const product = products.find((p: any) => p.id === params.id)

      if (product) {
        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "",
          subcategory: product.subcategory || "",
          barcode: product.barcode || "",
          brand: product.brand || "",
          origin: product.origin || "",
          tags: product.tags || [],
          images: product.images || (product.imageUrl ? [product.imageUrl] : []),
          price: product.price?.toString() || "",
          comparePrice: product.comparePrice?.toString() || "",
          costPrice: product.costPrice?.toString() || "",
          sku: product.sku || "",
          stock: product.stock?.toString() || "",
          lowStockThreshold: product.lowStockThreshold?.toString() || "10",
          weight: product.weight || "",
          dimensions: product.dimensions || "",
          variants: product.variants || [],
          metaTitle: product.metaTitle || "",
          metaDescription: product.metaDescription || "",
          slug: product.slug || "",
          visibility: product.status === "active" ? "active" : product.status === "draft" ? "draft" : "active",
          featured: product.featured || false,
          allowReservations: product.allowReservations || false,
          promotionType: product.promotionType || "none",
          promotionValue: product.promotionValue?.toString() || "",
        })
      } else {
        toast({
          title: "Produit introuvable",
          description: "Le produit demandé n'existe pas",
          variant: "destructive",
        })
        router.push("/merchant/catalog")
      }
    }
  }, [params.id, router, toast])

  useEffect(() => {
    if (formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.name])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const addVariant = () => {
    if (newVariant.color || newVariant.size) {
      setFormData((prev) => ({
        ...prev,
        variants: [...prev.variants, { ...newVariant, id: Date.now().toString() }],
      }))
      setNewVariant({ color: "", size: "", sku: "", stock: "", price: "" })
    }
  }

  const removeVariant = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }))
  }

  const startBarcodeScanner = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsScanning(true)
    } catch (error) {
      console.log("[v0] Error accessing camera:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'accéder à la caméra",
        variant: "destructive",
      })
    }
  }

  const stopBarcodeScanner = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
  }

  const calculateFinalPrice = () => {
    const price = Number.parseFloat(formData.price) || 0
    const promotionValue = Number.parseFloat(formData.promotionValue) || 0

    if (formData.promotionType === "fixed") {
      return Math.max(0, price - promotionValue)
    } else if (formData.promotionType === "percentage") {
      return price * (1 - promotionValue / 100)
    }
    return price
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.sku || !formData.stock) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const savedProducts = localStorage.getItem("merchant_products")
    const products = savedProducts ? JSON.parse(savedProducts) : []

    const updatedProduct = {
      id: params.id,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
      barcode: formData.barcode,
      brand: formData.brand,
      origin: formData.origin,
      tags: formData.tags,
      imageUrl: formData.images[0] || "/placeholder.svg",
      images: formData.images,
      price: Number.parseFloat(formData.price),
      comparePrice: formData.comparePrice ? Number.parseFloat(formData.comparePrice) : undefined,
      costPrice: formData.costPrice ? Number.parseFloat(formData.costPrice) : undefined,
      sku: formData.sku,
      stock: Number.parseInt(formData.stock),
      lowStockThreshold: Number.parseInt(formData.lowStockThreshold),
      weight: formData.weight,
      dimensions: formData.dimensions,
      variants: formData.variants,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      slug: formData.slug,
      status:
        formData.visibility === "active"
          ? Number.parseInt(formData.stock) === 0
            ? "out_of_stock"
            : Number.parseInt(formData.stock) < Number.parseInt(formData.lowStockThreshold)
              ? "low_stock"
              : "active"
          : "draft",
      featured: formData.featured,
      allowReservations: formData.allowReservations,
      promotionType: formData.promotionType,
      promotionValue: formData.promotionValue ? Number.parseFloat(formData.promotionValue) : undefined,
      finalPrice: calculateFinalPrice(),
    }

    const updatedProducts = products.map((p: any) => (p.id === params.id ? updatedProduct : p))
    localStorage.setItem("merchant_products", JSON.stringify(updatedProducts))

    toast({
      title: "Produit modifié",
      description: "Le produit a été modifié avec succès",
    })

    router.push("/merchant/catalog")
  }

  const finalPrice = calculateFinalPrice()
  const hasPromotion = formData.promotionType !== "none" && formData.promotionValue

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Modifier le produit</h1>
            <p className="mt-1 text-muted-foreground">Modifiez les informations de votre produit</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>Enregistrer les modifications</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Informations générales</TabsTrigger>
                <TabsTrigger value="pricing">Prix & Stock</TabsTrigger>
                <TabsTrigger value="variants">Variantes</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                {/* Informations de base */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Informations de base</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">
                            Nom du produit <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Ex: Tissu Wax Premium"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            rows={4}
                            placeholder="Décrivez votre produit..."
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="category">
                              Catégorie <span className="text-destructive">*</span>
                            </Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => handleInputChange("category", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une catégorie" />
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

                          <div>
                            <Label htmlFor="subcategory">Sous-catégorie</Label>
                            <Select
                              value={formData.subcategory}
                              onValueChange={(value) => handleInputChange("subcategory", value)}
                              disabled={!selectedCategory}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une sous-catégorie" />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedCategory?.subcategories.map((sub) => (
                                  <SelectItem key={sub} value={sub}>
                                    {sub}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="brand">Marque</Label>
                            <Input
                              id="brand"
                              placeholder="Ex: AfroDelights"
                              value={formData.brand}
                              onChange={(e) => handleInputChange("brand", e.target.value)}
                            />
                          </div>

                          <div>
                            <Label htmlFor="origin">Origine</Label>
                            <Input
                              id="origin"
                              placeholder="Ex: Côte d'Ivoire"
                              value={formData.origin}
                              onChange={(e) => handleInputChange("origin", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="barcode">Code-barres (EAN/UPC)</Label>
                          <div className="flex gap-2">
                            <Input
                              id="barcode"
                              placeholder="Ex: 3760123456789"
                              value={formData.barcode}
                              onChange={(e) => handleInputChange("barcode", e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={isScanning ? stopBarcodeScanner : startBarcodeScanner}
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                          {isScanning && (
                            <div className="mt-2 rounded-lg border overflow-hidden">
                              <video ref={videoRef} autoPlay className="w-full" />
                            </div>
                          )}
                        </div>

                        <div>
                          <Label>Tags</Label>
                          <div className="flex gap-2 mb-2">
                            <Input
                              placeholder="Ajouter un tag..."
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                            />
                            <Button type="button" variant="outline" onClick={addTag}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="gap-1">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Images */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Images du produit</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-lg border overflow-hidden group">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Produit ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && (
                              <Badge className="absolute bottom-2 left-2" variant="secondary">
                                Principal
                              </Badge>
                            )}
                          </div>
                        ))}
                        <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Ajouter</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SEO */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Référencement (SEO)</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="metaTitle">Titre SEO</Label>
                        <Input
                          id="metaTitle"
                          placeholder="Titre pour les moteurs de recherche"
                          value={formData.metaTitle}
                          onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                          maxLength={60}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">{formData.metaTitle.length}/60 caractères</p>
                      </div>

                      <div>
                        <Label htmlFor="metaDescription">Description SEO</Label>
                        <Textarea
                          id="metaDescription"
                          rows={3}
                          placeholder="Description pour les moteurs de recherche"
                          value={formData.metaDescription}
                          onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                          maxLength={160}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formData.metaDescription.length}/160 caractères
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="slug">URL (Slug)</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">/produits/</span>
                          <Input
                            id="slug"
                            placeholder="url-du-produit"
                            value={formData.slug}
                            onChange={(e) => handleInputChange("slug", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 bg-muted/50">
                        <p className="text-sm font-medium mb-2">Aperçu Google</p>
                        <div className="space-y-1">
                          <p className="text-blue-600 text-sm">
                            {formData.metaTitle || formData.name || "Titre du produit"}
                          </p>
                          <p className="text-xs text-green-700">afromarket.com/produits/{formData.slug || "produit"}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {formData.metaDescription || formData.description || "Description du produit..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                {/* Prix */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Tarification</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="price">
                            Prix de vente <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-9"
                              value={formData.price}
                              onChange={(e) => handleInputChange("price", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="comparePrice">Prix barré</Label>
                          <div className="relative">
                            <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="comparePrice"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-9"
                              value={formData.comparePrice}
                              onChange={(e) => handleInputChange("comparePrice", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="costPrice">Prix de revient</Label>
                          <div className="relative">
                            <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="costPrice"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-9"
                              value={formData.costPrice}
                              onChange={(e) => handleInputChange("costPrice", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Promotion */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Promotion</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Type de promotion</Label>
                        <RadioGroup
                          value={formData.promotionType}
                          onValueChange={(value) => handleInputChange("promotionType", value)}
                          className="flex gap-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="promo-none" />
                            <Label htmlFor="promo-none" className="font-normal cursor-pointer">
                              Aucune
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fixed" id="promo-fixed" />
                            <Label htmlFor="promo-fixed" className="font-normal cursor-pointer">
                              Montant fixe (€)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="percentage" id="promo-percentage" />
                            <Label htmlFor="promo-percentage" className="font-normal cursor-pointer">
                              Pourcentage (%)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.promotionType !== "none" && (
                        <div>
                          <Label htmlFor="promotionValue">Valeur de la promotion</Label>
                          <div className="relative">
                            {formData.promotionType === "fixed" ? (
                              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            )}
                            <Input
                              id="promotionValue"
                              type="number"
                              step="0.01"
                              placeholder={formData.promotionType === "fixed" ? "0.00" : "0"}
                              className="pl-9"
                              value={formData.promotionValue}
                              onChange={(e) => handleInputChange("promotionValue", e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      {hasPromotion && (
                        <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950/20">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Prix après promotion</p>
                              <p className="text-2xl font-bold text-green-600">€{finalPrice.toFixed(2)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground line-through">€{formData.price}</p>
                              <Badge variant="secondary" className="mt-1">
                                {formData.promotionType === "percentage"
                                  ? `-${formData.promotionValue}%`
                                  : `-€${formData.promotionValue}`}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Inventaire */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Inventaire</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="sku">
                            SKU <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="sku"
                            placeholder="Ex: TWX-001"
                            value={formData.sku}
                            onChange={(e) => handleInputChange("sku", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="stock">
                            Quantité en stock <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="stock"
                            type="number"
                            placeholder="0"
                            value={formData.stock}
                            onChange={(e) => handleInputChange("stock", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="lowStockThreshold">Seuil de stock faible</Label>
                        <Input
                          id="lowStockThreshold"
                          type="number"
                          placeholder="10"
                          value={formData.lowStockThreshold}
                          onChange={(e) => handleInputChange("lowStockThreshold", e.target.value)}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Vous serez alerté quand le stock atteint ce niveau
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expédition */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Expédition</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="weight">Poids (kg)</Label>
                          <Input
                            id="weight"
                            type="text"
                            placeholder="0.00"
                            value={formData.weight}
                            onChange={(e) => handleInputChange("weight", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="dimensions">Dimensions (L x l x H en cm)</Label>
                          <Input
                            id="dimensions"
                            placeholder="Ex: 30 x 20 x 10"
                            value={formData.dimensions}
                            onChange={(e) => handleInputChange("dimensions", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="variants" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Variantes du produit</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ajoutez des variantes si votre produit existe en plusieurs couleurs, tailles, etc.
                    </p>

                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-5">
                        <Input
                          placeholder="Couleur"
                          value={newVariant.color}
                          onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                        />
                        <Input
                          placeholder="Taille"
                          value={newVariant.size}
                          onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                        />
                        <Input
                          placeholder="SKU"
                          value={newVariant.sku}
                          onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Stock"
                          value={newVariant.stock}
                          onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                        />
                        <Button type="button" onClick={addVariant} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>

                      {formData.variants.length > 0 && (
                        <div className="rounded-lg border">
                          <table className="w-full">
                            <thead className="border-b bg-muted/50">
                              <tr>
                                <th className="p-3 text-left text-sm font-medium">Couleur</th>
                                <th className="p-3 text-left text-sm font-medium">Taille</th>
                                <th className="p-3 text-left text-sm font-medium">SKU</th>
                                <th className="p-3 text-left text-sm font-medium">Stock</th>
                                <th className="p-3 text-left text-sm font-medium">Prix</th>
                                <th className="p-3 text-right text-sm font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formData.variants.map((variant) => (
                                <tr key={variant.id} className="border-b last:border-0">
                                  <td className="p-3 text-sm">{variant.color || "-"}</td>
                                  <td className="p-3 text-sm">{variant.size || "-"}</td>
                                  <td className="p-3 text-sm font-mono">{variant.sku || "-"}</td>
                                  <td className="p-3 text-sm">{variant.stock || "0"}</td>
                                  <td className="p-3 text-sm">{variant.price ? `€${variant.price}` : "-"}</td>
                                  <td className="p-3 text-right">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeVariant(variant.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Statut</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Visibilité</Label>
                      <RadioGroup
                        value={formData.visibility}
                        onValueChange={(value) => handleInputChange("visibility", value)}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="active" id="visibility-active" />
                          <Label htmlFor="visibility-active" className="font-normal cursor-pointer">
                            Actif
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="draft" id="visibility-draft" />
                          <Label htmlFor="visibility-draft" className="font-normal cursor-pointer">
                            Brouillon
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured" className="cursor-pointer">
                        Produit vedette
                      </Label>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange("featured", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowReservations" className="cursor-pointer">
                        Autoriser les réservations
                      </Label>
                      <Switch
                        id="allowReservations"
                        checked={formData.allowReservations}
                        onCheckedChange={(checked) => handleInputChange("allowReservations", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button onClick={handleSubmit} className="w-full">
                    <Package className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => router.back()}>
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
