import { type NextRequest, NextResponse } from "next/server"
import { mockOrders } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const order = mockOrders.find((o) => o.id === id)

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

    const orderIndex = mockOrders.findIndex((o) => o.id === id)
    if (orderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Commande non trouvée",
        },
        { status: 404 },
      )
    }

    if (body.status) {
      mockOrders[orderIndex].status = body.status
    }

    return NextResponse.json(
      {
        success: true,
        data: mockOrders[orderIndex],
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
    const orderIndex = mockOrders.findIndex((o) => o.id === id)

    if (orderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Commande non trouvée",
        },
        { status: 404 },
      )
    }

    mockOrders.splice(orderIndex, 1)

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
