import { type NextRequest, NextResponse } from "next/server"
import { getPartners, createPartner } from "@/lib/api"

export async function GET(request: NextRequest) {
  try {
    const partners = await getPartners()

    return NextResponse.json(
      {
        success: true,
        data: partners,
        count: partners.length,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch partners",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.bookTitle || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Validate email format
    if (!body.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 },
      )
    }

    const newPartner = await createPartner({
      name: body.name,
      email: body.email,
      phone: body.phone,
      bookTitle: body.bookTitle,
      category: body.category,
      level: body.level,
      language: body.language,
      description: body.description,
    })

    return NextResponse.json(
      {
        success: true,
        data: newPartner,
        message: "Partner request submitted successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create partner",
      },
      { status: 500 },
    )
  }
}
