"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MoreVertical,
  Ban,
  CheckCircle2,
  Mail,
  MessageCircle,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Download,
  Users,
  UserCheck,
  UserX,
  Shield,
  Settings,
  Key,
  X,
  Calendar,
  ShoppingBag,
  Upload,
  MapPin,
  Building,
  FileText,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+33 6 12 34 56 78",
    avatar: "",
    type: "client" as const,
    group: "Clients",
    role: "Utilisateur",
    status: "active" as const,
    joinDate: "2024-12-15",
    lastLogin: "2025-01-20",
    orders: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+33 6 23 45 67 89",
    avatar: "",
    type: "merchant" as const,
    group: "Commerçants",
    role: "Propriétaire",
    status: "active" as const,
    joinDate: "2024-11-10",
    lastLogin: "2025-01-19",
    orders: 0,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+33 6 34 56 78 90",
    avatar: "",
    type: "client" as const,
    group: "Clients",
    role: "Utilisateur",
    status: "suspended" as const,
    joinDate: "2024-10-05",
    lastLogin: "2025-01-10",
    orders: 5,
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+33 6 45 67 89 01",
    avatar: "",
    type: "restaurant" as const,
    group: "Restaurateurs",
    role: "Propriétaire",
    status: "active" as const,
    joinDate: "2024-09-20",
    lastLogin: "2025-01-21",
    orders: 0,
  },
  {
    id: "5",
    name: "Admin ANIKA",
    email: "admin@afromarket.com",
    phone: "+33 6 56 78 90 12",
    avatar: "",
    type: "admin" as const,
    group: "Administrateurs",
    role: "Utilisateuer",
    status: "active" as const,
    joinDate: "2024-01-01",
    lastLogin: "2025-01-21",
    orders: 0,
  },
]

const groups = [
  { id: "1", name: "Clients", userCount: 1245, color: "blue" },
  { id: "2", name: "Commerçants", userCount: 156, color: "green" },
  { id: "3", name: "Restaurateurs", userCount: 89, color: "orange" },
  { id: "4", name: "Administrateurs", userCount: 5, color: "red" },
  { id: "5", name: "Modérateurs", userCount: 12, color: "purple" },
]

const roles = [
  {
    id: "1",
    name: "Super Admin",
    permissions: ["all"],
    userCount: 2,
  },
  {
    id: "2",
    name: "Admin",
    permissions: ["manage_users", "manage_businesses", "view_analytics"],
    userCount: 3,
  },
  {
    id: "3",
    name: "Modérateur",
    permissions: ["manage_comments", "manage_reviews"],
    userCount: 12,
  },
  {
    id: "4",
    name: "Propriétaire",
    permissions: ["manage_own_business", "manage_products"],
    userCount: 245,
  },
  {
    id: "5",
    name: "Utilisateur",
    permissions: ["view_products", "place_orders"],
    userCount: 1245,
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterGroup, setFilterGroup] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [viewingUser, setViewingUser] = useState<(typeof users)[0] | null>(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [editingUser, setEditingUser] = useState<(typeof users)[0] | null>(null)

   // ✅ Add this at the top of your component
  const handleSaveUser = () => {
    console.log("Save clicked for user:", editingUser);
    setIsEditModalOpen(false);
  }
  
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "clients" && user.type === "client") ||
      (activeTab === "merchants" && user.type === "merchant") ||
      (activeTab === "restaurants" && user.type === "restaurant") ||
      (activeTab === "admins" && user.type === "admin")
    const matchesType = filterType === "all" || user.type === filterType
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    const matchesGroup = filterGroup === "all" || user.group === filterGroup

    return matchesSearch && matchesTab && matchesType && matchesStatus && matchesGroup
  })

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id))
    }
  }

  const handleSendEmail = (user?: (typeof users)[0]) => {
    setIsEmailModalOpen(true)
    if (user) {
      setEmailSubject(`Message pour ${user.name}`)
    } else {
      setEmailSubject(`Message pour ${selectedUsers.length} utilisateur(s)`)
    }
  }

  const handleEditUser = (user: (typeof users)[0]) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }

  const handleWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Bonjour ${name}, `)
    window.open(`https://wa.me/${phone.replace(/\s/g, "")}?text=${message}`, "_blank")
  }

  const handleViewProfile = (user: (typeof users)[0]) => {
    setViewingUser(user)
    setIsProfileModalOpen(true)
  }

  const handleToggleStatus = (user: (typeof users)[0]) => {
    console.log(`[v0] Toggling status for user ${user.name}`)
    // In real app, this would call an API
  }

  const handleResetPassword = (user: (typeof users)[0]) => {
    console.log(`[v0] Resetting password for user ${user.name}`)
    // In real app, this would call an API
  }

  const handleDeleteUser = (user: (typeof users)[0]) => {
    console.log(`[v0] Deleting user ${user.name}`)
    // In real app, this would show confirmation dialog then call API
  }

  const handleBulkSuspend = () => {
    console.log(`[v0] Suspending ${selectedUsers.length} users`)
    // In real app, this would call an API
  }

  const handleBulkExport = () => {
    console.log(`[v0] Exporting ${selectedUsers.length} users`)
    // In real app, this would generate CSV/Excel file
  }

  const handleExport = () => {
    console.log(`[v0] Exporting all filtered users`)
    // In real app, this would generate CSV/Excel file
  }

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const newUsersThisMonth = users.filter((u) => u.joinDate.startsWith("2025-01")).length
  const suspendedUsers = users.filter((u) => u.status === "suspended").length

  return (
    <div className="p-3 md:p-4">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">Gestion des Utilisateurs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez tous les utilisateurs de la plateforme avec leurs groupes et rôles
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Tous les profils confondus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">{((activeUsers / totalUsers) * 100).toFixed(0)}% du total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux ce mois</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newUsersThisMonth}</div>
            <p className="text-xs text-muted-foreground">Janvier 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspendus</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suspendedUsers}</div>
            <p className="text-xs text-muted-foreground">Nécessitent attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 hidden">
          <TabsTrigger value="all">Tous ({users.length})</TabsTrigger>
          <TabsTrigger value="clients">Clients ({users.filter((u) => u.type === "client").length})</TabsTrigger>
          <TabsTrigger value="merchants">Commerçants ({users.filter((u) => u.type === "merchant").length})</TabsTrigger>
          <TabsTrigger value="restaurants">
            Restaurateurs ({users.filter((u) => u.type === "restaurant").length})
          </TabsTrigger>
          <TabsTrigger value="admins">Admins ({users.filter((u) => u.type === "admin").length})</TabsTrigger>
          <TabsTrigger value="groups">Groupes</TabsTrigger>
          <TabsTrigger value="roles">Rôles</TabsTrigger>
        </TabsList>

        {/* Users List Tabs */}
        {["all", "clients", "merchants", "restaurants", "admins"].includes(activeTab) && (
          <TabsContent value={activeTab} className="space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher par nom, email ou téléphone..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="merchant">Commerçant</SelectItem>
                        <SelectItem value="restaurant">Restaurateur</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="suspended">Suspendu</SelectItem>
                        <SelectItem value="banned">Banni</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterGroup} onValueChange={setFilterGroup}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Groupe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les groupes</SelectItem>
                        {groups.map((group) => (
                          <SelectItem key={group.id} value={group.name}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon" onClick={handleExport}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions Bar */}
            {selectedUsers.length > 0 && (
              <Card className="border-primary">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={true} onCheckedChange={toggleAllUsers} />
                    <span className="text-sm font-medium">{selectedUsers.length} utilisateur(s) sélectionné(s)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleSendEmail()}>
                      <Mail className="mr-2 h-4 w-4" />
                      Envoyer un email
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleBulkSuspend}>
                      <Ban className="mr-2 h-4 w-4" />
                      Suspendre
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleBulkExport}>
                      <Download className="mr-2 h-4 w-4" />
                      Exporter
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedUsers([])}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px]">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="p-3 text-left">
                          <Checkbox
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={toggleAllUsers}
                          />
                        </th>
                        <th className="p-3 text-left text-sm font-medium">Utilisateur</th>
                        <th className="p-3 text-left text-sm font-medium">Contact</th>
                        <th className="p-3 text-left text-sm font-medium">Type</th>
                        <th className="p-3 text-left text-sm font-medium">Groupe</th>
                        <th className="p-3 text-left text-sm font-medium">Rôle</th>
                        <th className="p-3 text-left text-sm font-medium">Statut</th>
                        <th className="p-3 text-left text-sm font-medium">Inscription</th>
                        <th className="p-3 text-left text-sm font-medium">Dernière connexion</th>
                        <th className="p-3 text-right text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b last:border-0">
                          <td className="p-3">
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={() => toggleUserSelection(user.id)}
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              <div className="text-muted-foreground">{user.email}</div>
                              <div className="text-muted-foreground">{user.phone}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {user.type === "client"
                                ? "Client"
                                : user.type === "merchant"
                                  ? "Commerçant"
                                  : user.type === "restaurant"
                                    ? "Restaurateur"
                                    : "Admin"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="secondary">{user.group}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "suspended"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {user.status === "active" ? "Actif" : user.status === "suspended" ? "Suspendu" : "Banni"}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{user.joinDate}</td>
                          <td className="p-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleSendEmail(user)}>
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleWhatsApp(user.phone, user.name)}>
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="gap-2" onClick={() => handleViewProfile(user)}>
                                    <Eye className="h-4 w-4" />
                                    Voir le profil
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2" onClick={() => handleEditUser(user)}>
                                    <Edit className="h-4 w-4" />
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="gap-2" onClick={() => handleResetPassword(user)}>
                                    <Key className="h-4 w-4" />
                                    Réinitialiser mot de passe
                                  </DropdownMenuItem>
                                  {user.status === "active" ? (
                                    <DropdownMenuItem
                                      className="gap-2 text-orange-600"
                                      onClick={() => handleToggleStatus(user)}
                                    >
                                      <Ban className="h-4 w-4" />
                                      Suspendre
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      className="gap-2 text-green-600"
                                      onClick={() => handleToggleStatus(user)}
                                    >
                                      <CheckCircle2 className="h-4 w-4" />
                                      Activer
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    className="gap-2 text-destructive"
                                    onClick={() => handleDeleteUser(user)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Groupes d'utilisateurs</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">Gérez les groupes et leurs membres</p>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Créer un groupe
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groups.map((group) => (
                  <Card key={group.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${group.color}-100`}>
                          <Users className={`h-6 w-6 text-${group.color}-600`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">{group.userCount} utilisateur(s)</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir les membres
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Rôles et Permissions</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">Gérez les rôles et leurs permissions</p>
                </div>
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Créer un rôle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <Card key={role.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-primary" />
                            <div>
                              <h3 className="font-semibold">{role.name}</h3>
                              <p className="text-sm text-muted-foreground">{role.userCount} utilisateur(s)</p>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {role.permissions.map((permission, index) => (
                              <Badge key={index} variant="secondary">
                                {permission === "all" ? "Toutes les permissions" : permission.replace(/_/g, " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

     {/* Email Modal */}
<Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
 <DialogContent
  className="
    w-full 
    max-w-full 
    sm:max-w-[600px] 
    max-h-[100vh] 
    mx-auto 
    mt-8 sm:mt-4    /* Mobile top margin zyada, desktop thoda kam */
    overflow-y-auto 
    rounded-lg 
    p-4 sm:p-6 
    bg-white
  "
>

    <DialogHeader>
      <DialogTitle className="text-lg font-semibold">Envoyer un email</DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">
        Composez votre message pour{" "}
        {selectedUsers.length > 0
          ? `${selectedUsers.length} utilisateur(s)`
          : "l'utilisateur sélectionné"}
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4 mt-4">
      {/* Subject */}
      <div className="flex flex-col">
        <Label htmlFor="subject" className="mb-1 text-sm font-medium">
          Sujet
        </Label>
        <Input
          id="subject"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          placeholder="Objet de l'email"
          className="rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <Label htmlFor="message" className="mb-1 text-sm font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)}
          placeholder="Votre message..."
          rows={6}
          className="rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary resize-none"
        />
      </div>
    </div>

    {/* Footer Buttons */}
    <DialogFooter className="mt-6 flex justify-end gap-3">
      <Button
        variant="outline"
        onClick={() => setIsEmailModalOpen(false)}
        className="px-4 py-2 rounded-md"
      >
        Annuler
      </Button>
      <Button
        onClick={() => setIsEmailModalOpen(false)}
        className="flex items-center gap-2 px-4 py-2 rounded-md"
      >
        <Mail className="h-4 w-4" />
        Envoyer
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Edit User Modal */}
<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
  <DialogContent className="sm:max-w-[800px] max-h-[85vh] mx-auto overflow-y-auto my-8 w-full">

    <DialogHeader>
      <DialogTitle>Modifier l'utilisateur</DialogTitle>
      <DialogDescription>Modifiez les informations de {editingUser?.name}</DialogDescription>
    </DialogHeader>

    {editingUser && (
      <div className="space-y-6">

        {/* Avatar & Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={editingUser.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl">
              {editingUser.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Changer la photo
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">JPG, PNG ou GIF (max. 2MB)</p>
          </div>
        </div>

        <Separator />

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informations personnelles</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-firstname">Prénom</Label>
              <Input id="edit-firstname" defaultValue={editingUser.name.split(" ")[0]} />
            </div>
            <div>
              <Label htmlFor="edit-lastname">Nom</Label>
              <Input id="edit-lastname" defaultValue={editingUser.name.split(" ")[1] || ""} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" type="email" defaultValue={editingUser.email} />
            </div>
            <div>
              <Label htmlFor="edit-phone">Téléphone</Label>
              <Input id="edit-phone" defaultValue={editingUser.phone} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-birthdate">Date de naissance</Label>
              <Input id="edit-birthdate" type="date" />
            </div>
            <div>
              <Label htmlFor="edit-gender">Genre</Label>
              <Select defaultValue="not-specified">
                <SelectTrigger id="edit-gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-specified">Non spécifié</SelectItem>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Adresse
          </h3>
          <div>
            <Label htmlFor="edit-address">Rue</Label>
            <Input id="edit-address" placeholder="123 Rue de la République" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="edit-city">Ville</Label>
              <Input id="edit-city" placeholder="Paris" />
            </div>
            <div>
              <Label htmlFor="edit-postal">Code postal</Label>
              <Input id="edit-postal" placeholder="75001" />
            </div>
            <div>
              <Label htmlFor="edit-country">Pays</Label>
              <Select defaultValue="france">
                <SelectTrigger id="edit-country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="belgium">Belgique</SelectItem>
                  <SelectItem value="switzerland">Suisse</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Business Info (Merchant/Restaurant) */}
        {(editingUser.type === "merchant" || editingUser.type === "restaurant") && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informations professionnelles
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="edit-business-name">Nom de l'entreprise</Label>
                  <Input id="edit-business-name" placeholder="Mon Commerce" />
                </div>
                <div>
                  <Label htmlFor="edit-siret">SIRET</Label>
                  <Input id="edit-siret" placeholder="123 456 789 00012" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="edit-business-type">Type d'activité</Label>
                  <Select defaultValue="retail">
                    <SelectTrigger id="edit-business-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Commerce de détail</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="grocery">Épicerie</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-website">Site web</Label>
                  <Input id="edit-website" type="url" placeholder="https://moncommerce.fr" />
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Account Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Paramètres du compte
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-type">Type de compte</Label>
              <Select defaultValue={editingUser.type}>
                <SelectTrigger id="edit-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="merchant">Commerçant</SelectItem>
                  <SelectItem value="restaurant">Restaurateur</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-status">Statut</Label>
              <Select defaultValue={editingUser.status}>
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="suspended">Suspendu</SelectItem>
                  <SelectItem value="banned">Banni</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-group">Groupe</Label>
              <Select defaultValue={editingUser.group}>
                <SelectTrigger id="edit-group">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {groups.map(group => (
                    <SelectItem key={group.id} value={group.name}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-role">Rôle</Label>
              <Select defaultValue={editingUser.role}>
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="edit-language">Langue préférée</Label>
              <Select defaultValue="fr">
                <SelectTrigger id="edit-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-timezone">Fuseau horaire</Label>
              <Select defaultValue="europe-paris">
                <SelectTrigger id="edit-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                  <SelectItem value="america-new-york">America/New York (GMT-5)</SelectItem>
                  <SelectItem value="africa-casablanca">Africa/Casablanca (GMT+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-expiry">Date d'expiration du compte (optionnel)</Label>
            <Input id="edit-expiry" type="date" />
            <p className="mt-1 text-xs text-muted-foreground">
              Laissez vide pour un compte sans date d'expiration
            </p>
          </div>
        </div>

        <Separator />

        {/* Account Info (Read-only) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Informations du compte
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="text-muted-foreground">Date d'inscription</Label>
              <p className="text-sm font-medium">{editingUser.joinDate}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Dernière connexion</Label>
              <p className="text-sm font-medium">{editingUser.lastLogin}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Nombre de connexions</Label>
              <p className="text-sm font-medium">127 fois</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Permissions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissions spécifiques
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="perm-manage-users" />
              <Label htmlFor="perm-manage-users" className="font-normal">Gérer les utilisateurs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm-manage-businesses" />
              <Label htmlFor="perm-manage-businesses" className="font-normal">Gérer les commerces</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm-view-analytics" />
              <Label htmlFor="perm-view-analytics" className="font-normal">Voir les statistiques</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm-manage-payments" />
              <Label htmlFor="perm-manage-payments" className="font-normal">Gérer les paiements</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="perm-moderate-content" />
              <Label htmlFor="perm-moderate-content" className="font-normal">Modérer le contenu</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Admin Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notes administratives</h3>
          <div>
            <Label htmlFor="edit-notes">Notes internes</Label>
            <Textarea id="edit-notes" placeholder="Ajouter des notes..." defaultValue={editingUser.adminNotes} />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleSaveUser}>
            Enregistrer les modifications
          </Button>
        </DialogFooter>

      </div>
    )}

  </DialogContent>
</Dialog>
<Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
  <DialogContent className="sm:max-w-[600px] max-h-[80vh] mx-auto my-6 w-full overflow-y-auto">

    <DialogHeader>
      <DialogTitle>Profil de l'utilisateur</DialogTitle>
      <DialogDescription>Informations détaillées de l'utilisateur</DialogDescription>
    </DialogHeader>

    {viewingUser && (
      <div className="space-y-6">

        {/* User Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={viewingUser.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl">
              {viewingUser.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold">{viewingUser.name}</h3>
            <p className="text-muted-foreground">{viewingUser.email}</p>

            <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <Badge variant="secondary">{viewingUser.group}</Badge>
              <Badge variant="outline">{viewingUser.role}</Badge>
              <Badge
                variant={
                  viewingUser.status === "active"
                    ? "default"
                    : viewingUser.status === "suspended"
                      ? "secondary"
                      : "destructive"
                }
              >
                {viewingUser.status === "active"
                  ? "Actif"
                  : viewingUser.status === "suspended"
                    ? "Suspendu"
                    : "Banni"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{viewingUser.email}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium">Téléphone</p>
                <p className="text-sm text-muted-foreground">{viewingUser.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations du compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium">Type de compte</p>
                <p className="text-sm text-muted-foreground">
                  {viewingUser.type === "client"
                    ? "Client"
                    : viewingUser.type === "merchant"
                      ? "Commerçant"
                      : viewingUser.type === "restaurant"
                        ? "Restaurateur"
                        : "Administrateur"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium">Groupe</p>
                <p className="text-sm text-muted-foreground">{viewingUser.group}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <Key className="h-4 w-4 text-muted-foreground" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium">Rôle</p>
                <p className="text-sm text-muted-foreground">{viewingUser.role}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium">Date d'inscription</p>
                <p className="text-sm text-muted-foreground">{viewingUser.joinDate}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium">Dernière connexion</p>
                <p className="text-sm text-muted-foreground">{viewingUser.lastLogin}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Statistics (Client only) */}
        {viewingUser.type === "client" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques d'activité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium">Commandes passées</p>
                  <p className="text-sm text-muted-foreground">{viewingUser.orders} commande(s)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center sm:justify-start">
          <Button variant="outline" onClick={() => handleEditUser(viewingUser)}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="outline" onClick={() => handleSendEmail(viewingUser)}>
            <Mail className="mr-2 h-4 w-4" />
            Envoyer un email
          </Button>
          <Button variant="outline" onClick={() => handleWhatsApp(viewingUser.phone, viewingUser.name)}>
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
          <Button variant="outline" onClick={() => handleResetPassword(viewingUser)}>
            <Key className="mr-2 h-4 w-4" />
            Réinitialiser mot de passe
          </Button>
          {viewingUser.status === "active" ? (
            <Button
              variant="outline"
              className="text-orange-600 bg-transparent"
              onClick={() => handleToggleStatus(viewingUser)}
            >
              <Ban className="mr-2 h-4 w-4" />
              Suspendre
            </Button>
          ) : (
            <Button
              variant="outline"
              className="text-green-600 bg-transparent"
              onClick={() => handleToggleStatus(viewingUser)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Activer
            </Button>
          )}
        </div>

      </div>
    )}

    <DialogFooter>
      <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>
        Fermer
      </Button>
    </DialogFooter>

  </DialogContent>
</Dialog>

              
       
    </div>
  )
}
