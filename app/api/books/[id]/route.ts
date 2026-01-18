import { type NextRequest, NextResponse } from "next/server"
import { getBookById } from "@/lib/api"
import { mockBooks } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const book = await getBookById(id)

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          error: "Livre non trouvé",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: book,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch book",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const bookIndex = mockBooks.findIndex((b) => b.id === id)
    if (bookIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Livre non trouvé",
        },
        { status: 404 },
      )
    }

    // Update images and primary image
    const updateData = {
      ...mockBooks[bookIndex],
      ...body,
    }

    // If images array is provided, use first image as primary
    if (body.images && body.images.length > 0) {
      updateData.image = body.image || body.images[0]
    }

    mockBooks[bookIndex] = updateData

    return NextResponse.json(
      {
        success: true,
        data: mockBooks[bookIndex],
        message: "Livre mis à jour avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Impossible de mettre à jour le livre",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const bookIndex = mockBooks.findIndex((b) => b.id === id)
    if (bookIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Livre non trouvé",
        },
        { status: 404 },
      )
    }

    mockBooks.splice(bookIndex, 1)

    return NextResponse.json(
      {
        success: true,
        message: "Livre supprimé avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete book",
      },
      { status: 500 },
    )
  }
}
