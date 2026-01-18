import { type NextRequest, NextResponse } from "next/server"
import { getBooks } from "@/lib/api"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const language = searchParams.get("language")

    const books = await getBooks({
      category: category as any,
      level: level as any,
      language: language as any,
    })

    return NextResponse.json(
      {
        success: true,
        data: books,
        count: books.length,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch books",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.author || !body.price || !body.description || !body.images || body.images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields or no images provided",
        },
        { status: 400 },
      )
    }

    // In a real app, this would save to the database
    const newBook = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
      image: body.image || body.images[0], // Set primary image from first image
      createdAt: new Date(),
    }

    return NextResponse.json(
      {
        success: true,
        data: newBook,
        message: "Livre créé avec succès",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Impossible de créer le livre",
      },
      { status: 500 },
    )
  }
}
