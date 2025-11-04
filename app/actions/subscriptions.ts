"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Schéma de validation pour l'annulation d'abonnement
const cancelSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1),
  reason: z.string().optional(),
})

/**
 * Annule un abonnement de manière sécurisée
 * @param subscriptionId - ID de l'abonnement à annuler
 * @param reason - Raison de l'annulation (optionnel)
 */
export async function cancelSubscription(subscriptionId: string, reason?: string) {
  try {
    // Validation des entrées
    const validated = cancelSubscriptionSchema.parse({ subscriptionId, reason })

    // Créer le client Supabase avec les cookies
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.SUPABASE_SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    // Vérifier l'authentification
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Non autorisé" }
    }

    // Annuler l'abonnement dans la base de données
    const { error } = await supabase
      .from("subscriptions")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancellation_reason: validated.reason,
      })
      .eq("id", validated.subscriptionId)
      .eq("merchant_id", user.id) // Sécurité: vérifier que l'abonnement appartient au marchand

    if (error) {
      console.error("Erreur lors de l'annulation:", error)
      return { success: false, error: "Erreur lors de l'annulation" }
    }

    // Revalider la page pour afficher les nouvelles données
    revalidatePath("/merchant/subscriptions")

    return { success: true }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur serveur" }
  }
}

/**
 * Suspend un abonnement
 */
export async function suspendSubscription(subscriptionId: string) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Non autorisé" }
    }

    const { error } = await supabase
      .from("subscriptions")
      .update({
        status: "suspended",
        suspended_at: new Date().toISOString(),
      })
      .eq("id", subscriptionId)
      .eq("merchant_id", user.id)

    if (error) {
      return { success: false, error: "Erreur lors de la suspension" }
    }

    revalidatePath("/merchant/subscriptions")
    return { success: true }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur serveur" }
  }
}

/**
 * Réactive un abonnement
 */
export async function reactivateSubscription(subscriptionId: string) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      },
    )

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Non autorisé" }
    }

    const { error } = await supabase
      .from("subscriptions")
      .update({
        status: "active",
        reactivated_at: new Date().toISOString(),
      })
      .eq("id", subscriptionId)
      .eq("merchant_id", user.id)

    if (error) {
      return { success: false, error: "Erreur lors de la réactivation" }
    }

    revalidatePath("/merchant/subscriptions")
    return { success: true }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur serveur" }
  }
}
