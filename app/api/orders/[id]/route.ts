import { type NextRequest, NextResponse } from "next/server"
import { getOrderById, updateOrder, deleteOrder } from "@/lib/api"

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

    const updated = await updateOrder(id, body)
    if (!updated) {
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
        data: updated,
        message: "Commande mise à jour avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order",
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
