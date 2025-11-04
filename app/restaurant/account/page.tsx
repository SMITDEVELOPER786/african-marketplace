import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { RestaurantAccountForm } from "@/components/restaurant/restaurant-account-form"

export default async function RestaurantAccountPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/restaurant/login")
  }

  // Fetch restaurant profile
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (restaurantError || !restaurant) {
    redirect("/restaurant/dashboard")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Restaurant Account</h1>
        <p className="text-muted-foreground mb-8">Manage your restaurant profile and account settings</p>

        <RestaurantAccountForm restaurant={restaurant} />
      </div>
    </div>
  )
}
