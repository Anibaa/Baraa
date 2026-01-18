import { type NextRequest, NextResponse } from "next/server"
import { getOrders } from "@/lib/api"
import { mockOrders } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const orders = await getOrders()

    return NextResponse.json(
      {
        success: true,
        data: orders,
        count: orders.length,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (
      !body.bookIds ||
      !body.quantities ||
      !body.customerName ||
      !body.customerEmail ||
      !body.customerPhone ||
      !body.address
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      bookIds: body.bookIds,
      quantities: body.quantities,
      totalPrice: body.totalPrice,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      address: body.address,
      paymentMethod: body.paymentMethod || "Card",
      status: "Préparation" as const,
      createdAt: new Date(),
    }

    mockOrders.push(newOrder)

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: "Commande créée avec succès",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
