import { type NextRequest, NextResponse } from "next/server"
import { mockSliders } from "@/lib/mock-data"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const sliderIndex = mockSliders.findIndex((s) => s.id === id)
    if (sliderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Promotion non trouvée",
        },
        { status: 404 },
      )
    }

    mockSliders[sliderIndex] = {
      ...mockSliders[sliderIndex],
      ...body,
    }

    return NextResponse.json(
      {
        success: true,
        data: mockSliders[sliderIndex],
        message: "Promotion mise à jour avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update slider",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const sliderIndex = mockSliders.findIndex((s) => s.id === id)
    if (sliderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Promotion non trouvée",
        },
        { status: 404 },
      )
    }

    mockSliders.splice(sliderIndex, 1)

    return NextResponse.json(
      {
        success: true,
        message: "Promotion supprimée avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete slider",
      },
      { status: 500 },
    )
  }
}
