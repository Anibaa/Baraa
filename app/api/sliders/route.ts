import { type NextRequest, NextResponse } from "next/server"
import { getSliders } from "@/lib/api"

export async function GET(request: NextRequest) {
  try {
    const sliders = await getSliders()

    return NextResponse.json(
      {
        success: true,
        data: sliders,
        count: sliders.length,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch sliders",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.subtitle || !body.image || !body.cta || !body.link) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // In a real app, this would save to the database
    const newSlider = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      createdAt: new Date(),
    }

    return NextResponse.json(
      {
        success: true,
        data: newSlider,
        message: "Slider created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create slider",
      },
      { status: 500 },
    )
  }
}
