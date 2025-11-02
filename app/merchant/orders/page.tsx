"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Package, Truck, CheckCircle2, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const orders = [
  {
    id: "ORD-1234",
    customer: "John Doe",
    items: 3,
    total: 125.5,
    status: "pending" as const,
    fulfillment: "delivery" as const,
    date: "2025-01-18 10:30 AM",
  },
  {
    id: "ORD-1233",
    customer: "Jane Smith",
    items: 2,
    total: 89.99,
    status: "confirmed" as const,
    fulfillment: "click_collect" as const,
    date: "2025-01-18 09:15 AM",
  },
  {
    id: "ORD-1232",
    customer: "Mike Johnson",
    items: 5,
    total: 156.75,
    status: "preparing" as const,
    fulfillment: "delivery" as const,
    date: "2025-01-18 08:45 AM",
  },
  {
    id: "ORD-1231",
    customer: "Sarah Williams",
    items: 1,
    total: 67.25,
    status: "ready" as const,
    fulfillment: "click_collect" as const,
    date: "2025-01-18 07:20 AM",
  },
  {
    id: "ORD-1230",
    customer: "David Brown",
    items: 4,
    total: 198.5,
    status: "delivered" as const,
    fulfillment: "delivery" as const,
    date: "2025-01-17 04:30 PM",
  },
]

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
  confirmed: { label: "Confirmed", variant: "default" as const, icon: CheckCircle2 },
  preparing: { label: "Preparing", variant: "default" as const, icon: Package },
  ready: { label: "Ready", variant: "default" as const, icon: CheckCircle2 },
  out_for_delivery: { label: "Out for Delivery", variant: "default" as const, icon: Truck },
  delivered: { label: "Delivered", variant: "outline" as const, icon: CheckCircle2 },
}

export default function MerchantOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return order.status === "pending"
    if (activeTab === "active") return ["confirmed", "preparing", "ready", "out_for_delivery"].includes(order.status)
    if (activeTab === "completed") return order.status === "delivered"
    return true
  })

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="mt-2 text-muted-foreground">Manage and track your customer orders</p>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders by ID or customer name..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="p-4 text-left text-sm font-medium">Order ID</th>
                      <th className="p-4 text-left text-sm font-medium">Customer</th>
                      <th className="p-4 text-left text-sm font-medium">Items</th>
                      <th className="p-4 text-left text-sm font-medium">Total</th>
                      <th className="p-4 text-left text-sm font-medium">Type</th>
                      <th className="p-4 text-left text-sm font-medium">Status</th>
                      <th className="p-4 text-left text-sm font-medium">Date</th>
                      <th className="p-4 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const statusInfo = statusConfig[order.status]
                      const StatusIcon = statusInfo.icon
                      return (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4 text-muted-foreground">{order.items} items</td>
                          <td className="p-4 font-medium">${order.total.toFixed(2)}</td>
                          <td className="p-4">
                            <Badge variant="outline">
                              {order.fulfillment === "delivery" ? "Delivery" : "Click & Collect"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={statusInfo.variant} className="gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {statusInfo.label}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{order.date}</td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
