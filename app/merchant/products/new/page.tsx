"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Upload, X, Scan, Plus, Trash2, Video, Package, Truck, Globe, Tag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const CATEGORIES = {
  Alimentation: [
    "Épices & Assaisonnements",
    "Farines & Féculents",
    "Huiles & Graisses",
    "Poissons & Viandes Séchées",
    "Légumes & Fruits Séchés",
    "Boissons",
    "Snacks & Confiseries",
  ],
  "Tissus & Mode": ["Tissus Wax", "Tissus Bazin", "Pagnes", "Vêtements Traditionnels", "Accessoires de Mode"],
  Artisanat: ["Décoration", "Bijoux", "Sculptures", "Paniers & Vannerie", "Instruments de Musique"],
  "Cosmétiques & Bien-être": [
    "Soins Capillaires",
    "Soins de la Peau",
    "Huiles Essentielles",
    "Savons Naturels",
    "Parfums",
  ],
  Épicerie: ["Conserves", "Céréales & Grains", "Pâtes & Riz", "Sauces & Condiments"],
}

export default function NewProductPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [variants, setVariants] = useState<
    Array<{ color: string; size: string; sku: string; stock: string; price: string }>
  >([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    comparePrice: "",
    hasPromotion: false,
    promotionType: "amount", // "amount" ou "percentage"
    promotionValue: "",
    sku: "",
    barcode: "",
    brand: "",
    origin: "",
    stock: "",
    lowStockThreshold: "",
    weight: "",
    dimensions: "",
    status: "active",
    featured: false,
    allowReservation: true,
    materials: "",
    videoUrl: "",
    metaTitle: "",
    metaDescription: "",
    slug: "",
    nutritionalInfo: "",
    expiryDate: "",
    storageConditions: "",
    allergens: "",
  })

  const [subcategories, setSubcategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category, subcategory: "" })
    setSubcategories(CATEGORIES[category as keyof typeof CATEGORIES] || [])
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const startBarcodeScanner = async () => {
    setShowBarcodeScanner(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.log("[v0] Error accessing camera:", error)
      alert("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.")
    }
  }

  const stopBarcodeScanner = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    setShowBarcodeScanner(false)
  }

  const addVariant = () => {
    setVariants([...variants, { color: "", size: "", sku: "", stock: "", price: "" }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setVariants(newVariants)
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
      metaTitle: name,
    })
  }

  const calculateFinalPrice = () => {
    if (!formData.hasPromotion || !formData.price || !formData.promotionValue) {
      return Number(formData.price)
    }

    const basePrice = Number(formData.price)
    const promoValue = Number(formData.promotionValue)

    if (formData.promotionType === "percentage") {
      return basePrice - (basePrice * promoValue) / 100
    } else {
      return basePrice - promoValue
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Product data:", { ...formData, images, variants, tags, finalPrice: calculateFinalPrice() })
    router.push("/merchant/catalog")
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/merchant/catalog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Ajouter un produit</h1>
          <p className="mt-1 text-muted-foreground">Créez un nouveau produit pour votre boutique</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Informations générales</TabsTrigger>
                <TabsTrigger value="pricing">Prix & Stock</TabsTrigger>
                <TabsTrigger value="variants">Variantes</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de base</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom du produit *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="Ex: Tissu Wax Premium"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Décrivez votre produit en détail..."
                        rows={5}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="category">Catégorie *</Label>
                        <Select value={formData.category} onValueChange={handleCategoryChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(CATEGORIES).map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subcategory">Sous-catégorie</Label>
                        <Select
                          value={formData.subcategory}
                          onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                          disabled={!formData.category}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une sous-catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {subcategories.map((subcat) => (
                              <SelectItem key={subcat} value={subcat}>
                                {subcat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="brand">Marque / Fabricant</Label>
                        <Input
                          id="brand"
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          placeholder="Ex: African Textiles Co."
                        />
                      </div>

                      <div>
                        <Label htmlFor="origin">Pays d'origine</Label>
                        <Input
                          id="origin"
                          value={formData.origin}
                          onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                          placeholder="Ex: Côte d'Ivoire"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="materials">Matériaux / Composition</Label>
                      <Input
                        id="materials"
                        value={formData.materials}
                        onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                        placeholder="Ex: 100% Coton"
                      />
                    </div>

                    <div>
                      <Label>Tags / Mots-clés</Label>
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                          placeholder="Ajouter un tag..."
                        />
                        <Button type="button" onClick={addTag} size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1">
                            {tag}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {formData.category === "Alimentation" && (
                      <>
                        <div>
                          <Label htmlFor="nutritionalInfo">Informations nutritionnelles</Label>
                          <Textarea
                            id="nutritionalInfo"
                            value={formData.nutritionalInfo}
                            onChange={(e) => setFormData({ ...formData, nutritionalInfo: e.target.value })}
                            placeholder="Calories, protéines, glucides, lipides..."
                            rows={3}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="expiryDate">Date de péremption</Label>
                            <Input
                              id="expiryDate"
                              type="date"
                              value={formData.expiryDate}
                              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                          </div>

                          <div>
                            <Label htmlFor="storageConditions">Conditions de conservation</Label>
                            <Input
                              id="storageConditions"
                              value={formData.storageConditions}
                              onChange={(e) => setFormData({ ...formData, storageConditions: e.target.value })}
                              placeholder="Ex: À conserver au frais"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="allergens">Allergènes</Label>
                          <Input
                            id="allergens"
                            value={formData.allergens}
                            onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                            placeholder="Ex: Arachides, gluten..."
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Images & Médias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {images.map((image, index) => (
                        <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          {index === 0 && <Badge className="absolute left-2 top-2">Principal</Badge>}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 rounded-full bg-destructive p-1 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <X className="h-4 w-4 text-destructive-foreground" />
                          </button>
                        </div>
                      ))}
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:border-primary">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="mt-2 text-sm text-muted-foreground">Ajouter</span>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>

                    <div>
                      <Label htmlFor="videoUrl">
                        <Video className="mr-2 inline h-4 w-4" />
                        URL de la vidéo (YouTube, Vimeo...)
                      </Label>
                      <Input
                        id="videoUrl"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Référencement (SEO)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="slug">URL du produit (slug)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">/produits/</span>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          placeholder="tissu-wax-premium"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="metaTitle">Titre SEO</Label>
                      <Input
                        id="metaTitle"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        placeholder="Titre optimisé pour les moteurs de recherche"
                        maxLength={60}
                      />
                      <p className="mt-1 text-sm text-muted-foreground">{formData.metaTitle.length}/60 caractères</p>
                    </div>

                    <div>
                      <Label htmlFor="metaDescription">Description SEO</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        placeholder="Description optimisée pour les moteurs de recherche"
                        rows={3}
                        maxLength={160}
                      />
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formData.metaDescription.length}/160 caractères
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Prix et tarification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="price">Prix de vente *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="pl-7"
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="comparePrice">Prix barré (avant réduction)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                          <Input
                            id="comparePrice"
                            type="number"
                            step="0.01"
                            value={formData.comparePrice}
                            onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                            className="pl-7"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border-2 border-dashed p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tag className="h-5 w-5 text-primary" />
                          <Label htmlFor="hasPromotion" className="text-base font-semibold">
                            Promouvoir ce produit
                          </Label>
                        </div>
                        <Switch
                          id="hasPromotion"
                          checked={formData.hasPromotion}
                          onCheckedChange={(checked) => setFormData({ ...formData, hasPromotion: checked })}
                        />
                      </div>

                      {formData.hasPromotion && (
                        <div className="space-y-4">
                          <div>
                            <Label>Type de promotion</Label>
                            <RadioGroup
                              value={formData.promotionType}
                              onValueChange={(value) => setFormData({ ...formData, promotionType: value })}
                              className="mt-2 flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="amount" id="amount" />
                                <Label htmlFor="amount" className="font-normal">
                                  Montant fixe (€)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="percentage" id="percentage" />
                                <Label htmlFor="percentage" className="font-normal">
                                  Pourcentage (%)
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label htmlFor="promotionValue">
                              {formData.promotionType === "percentage"
                                ? "Pourcentage de réduction"
                                : "Montant de réduction"}
                            </Label>
                            <div className="relative">
                              <Input
                                id="promotionValue"
                                type="number"
                                step="0.01"
                                value={formData.promotionValue}
                                onChange={(e) => setFormData({ ...formData, promotionValue: e.target.value })}
                                placeholder={formData.promotionType === "percentage" ? "Ex: 20" : "Ex: 5.00"}
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                {formData.promotionType === "percentage" ? "%" : "€"}
                              </span>
                            </div>
                          </div>

                          {formData.price && formData.promotionValue && (
                            <div className="rounded-lg bg-green-50 p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-green-900">Prix après promotion</p>
                                  <p className="text-2xl font-bold text-green-700">
                                    €{calculateFinalPrice().toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-green-700">Économie</p>
                                  <p className="text-lg font-semibold text-green-900">
                                    {formData.promotionType === "percentage"
                                      ? `${formData.promotionValue}%`
                                      : `€${formData.promotionValue}`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Gestion des stocks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="sku">SKU (Code produit)</Label>
                        <Input
                          id="sku"
                          value={formData.sku}
                          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                          placeholder="Ex: TWX-001"
                        />
                      </div>

                      <div>
                        <Label htmlFor="barcode">Code-barres (EAN/UPC)</Label>
                        <div className="flex gap-2">
                          <Input
                            id="barcode"
                            value={formData.barcode}
                            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                            placeholder="Ex: 3760123456789"
                          />
                          <Button type="button" size="icon" variant="outline" onClick={startBarcodeScanner}>
                            <Scan className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="stock">Quantité en stock *</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="lowStockThreshold">Seuil de stock faible</Label>
                        <Input
                          id="lowStockThreshold"
                          type="number"
                          value={formData.lowStockThreshold}
                          onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Expédition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="weight">Poids (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.01"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dimensions">Dimensions (L x l x H en cm)</Label>
                        <Input
                          id="dimensions"
                          value={formData.dimensions}
                          onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                          placeholder="Ex: 30 x 20 x 10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="variants" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Variantes du produit</CardTitle>
                      <Button type="button" onClick={addVariant} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter une variante
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {variants.length === 0 ? (
                      <div className="rounded-lg border-2 border-dashed p-8 text-center">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Aucune variante. Ajoutez des variantes si votre produit existe en plusieurs couleurs, tailles,
                          etc.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {variants.map((variant, index) => (
                          <Card key={index}>
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold">Variante {index + 1}</h4>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeVariant(index)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div>
                                    <Label>Couleur</Label>
                                    <Input
                                      value={variant.color}
                                      onChange={(e) => updateVariant(index, "color", e.target.value)}
                                      placeholder="Ex: Rouge"
                                    />
                                  </div>

                                  <div>
                                    <Label>Taille</Label>
                                    <Input
                                      value={variant.size}
                                      onChange={(e) => updateVariant(index, "size", e.target.value)}
                                      placeholder="Ex: M"
                                    />
                                  </div>

                                  <div>
                                    <Label>SKU</Label>
                                    <Input
                                      value={variant.sku}
                                      onChange={(e) => updateVariant(index, "sku", e.target.value)}
                                      placeholder="Ex: TWX-001-RED-M"
                                    />
                                  </div>

                                  <div>
                                    <Label>Stock</Label>
                                    <Input
                                      type="number"
                                      value={variant.stock}
                                      onChange={(e) => updateVariant(index, "stock", e.target.value)}
                                      placeholder="0"
                                    />
                                  </div>

                                  <div>
                                    <Label>Prix (si différent)</Label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        €
                                      </span>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={variant.price}
                                        onChange={(e) => updateVariant(index, "price", e.target.value)}
                                        className="pl-7"
                                        placeholder="0.00"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statut</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Visibilité</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="archived">Archivé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Produit vedette</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="allowReservation">Autoriser les réservations</Label>
                  <Switch
                    id="allowReservation"
                    checked={formData.allowReservation}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowReservation: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 pt-6">
                <Button type="submit" className="w-full">
                  Publier le produit
                </Button>
                <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => router.back()}>
                  Annuler
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      <Dialog open={showBarcodeScanner} onOpenChange={setShowBarcodeScanner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scanner le code-barres</DialogTitle>
            <DialogDescription>Positionnez le code-barres devant la caméra</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={stopBarcodeScanner}>
                Annuler
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={() => {
                  setFormData({ ...formData, barcode: "3760123456789" })
                  stopBarcodeScanner()
                }}
              >
                Capturer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
