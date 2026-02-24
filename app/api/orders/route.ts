import { type NextRequest, NextResponse } from "next/server"
import { getOrders, createOrder } from "@/lib/api"

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

    console.log("Received order request:", JSON.stringify(body, null, 2))

    // Validate required fields
    if (
      !body.items ||
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      !body.customerName ||
      !body.customerPhone ||
      !body.address
    ) {
      console.error("Missing required fields:", {
        hasItems: !!body.items,
        isArray: Array.isArray(body.items),
        itemsLength: body.items?.length,
        hasCustomerName: !!body.customerName,
        hasCustomerPhone: !!body.customerPhone,
        hasAddress: !!body.address,
      })
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Validate each item has required fields
    for (let i = 0; i < body.items.length; i++) {
      const item = body.items[i]
      if (!item.bookId || !item.quantity || !item.size || !item.color || item.price === undefined) {
        console.error(`Invalid item at index ${i}:`, {
          bookId: item.bookId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price,
        })
        return NextResponse.json(
          {
            success: false,
            error: `Invalid item data at position ${i + 1} - missing bookId, quantity, size, color, or price`,
          },
          { status: 400 },
        )
      }
    }

    const newOrder = await createOrder({
      items: body.items,
      totalPrice: body.totalPrice,
      customerName: body.customerName,
      customerEmail: body.customerEmail || "",
      customerPhone: body.customerPhone,
      address: body.address,
      paymentMethod: body.paymentMethod || "Card",
      status: "قيد التحضير",
    })

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: "Commande créée avec succès",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
