import { type NextRequest, NextResponse } from "next/server"
import { getOrderById, updateOrder, deleteOrder, reduceStock } from "@/lib/api"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const order = await getOrderById(id)

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: "Commande non trouvée",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: order,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch order",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Get the current order to check status change
    const currentOrder = await getOrderById(id)
    if (!currentOrder) {
      return NextResponse.json(
        {
          success: false,
          error: "Commande non trouvée",
        },
        { status: 404 },
      )
    }

    // Check if status is changing to "مؤكد" (Confirmé)
    const isConfirming = body.status === "مؤكد" && currentOrder.status !== "مؤكد"

    // Update the order
    const updated = await updateOrder(id, body)
    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: "Échec de la mise à jour",
        },
        { status: 404 },
      )
    }

    let stockUpdated = 0

    // If confirming, reduce stock for each item
    if (isConfirming) {
      for (const item of currentOrder.items) {
        try {
          const success = await reduceStock(item.bookId, item.size, item.color, item.quantity)
          if (success) {
            stockUpdated++
          } else {
            console.warn(`Failed to reduce stock for item: ${item.bookId}, size: ${item.size}, color: ${item.color}`)
          }
        } catch (error) {
          console.error(`Error reducing stock for item ${item.bookId}:`, error)
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: updated,
        message: "Commande mise à jour avec succès",
        stockUpdated: isConfirming ? stockUpdated : undefined,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update order",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const ok = await deleteOrder(id)

    if (!ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Commande non trouvée",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Commande supprimée avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete order",
      },
      { status: 500 },
    )
  }
}
