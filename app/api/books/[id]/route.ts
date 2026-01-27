import { type NextRequest, NextResponse } from "next/server"
import { getBookById } from "@/lib/api"
import dbConnect from "@/lib/db"
import Book from "@/lib/models/book.model"
import { del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

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
    await dbConnect()
    const { id } = await params
    const body = await request.json()

    // If images array is provided, use first image as primary if primary not specified properly
    if (body.images && body.images.length > 0 && !body.image) {
      body.image = body.images[0]
    }

    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true })

    if (!updatedBook) {
      return NextResponse.json(
        {
          success: false,
          error: "Livre non trouvé",
        },
        { status: 404 },
      )
    }

    // Revalidate pages that might show this book
    revalidatePath('/')
    revalidatePath('/books')
    revalidatePath(`/books/${id}`)
    revalidatePath('/admin')

    return NextResponse.json(
      {
        success: true,
        data: updatedBook,
        message: "Livre mis à jour avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Update book error:", error)
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
    await dbConnect()
    const { id } = await params

    // Find book first to get images
    const bookToDelete = await Book.findById(id);

    if (!bookToDelete) {
      return NextResponse.json(
        {
          success: false,
          error: "Livre non trouvé",
        },
        { status: 404 },
      )
    }

    // Delete the book from database
    const deletedBook = await Book.findByIdAndDelete(id)

    // Delete associated images from Vercel Blob
    if (deletedBook) {
      const imagesToDelete = [];
      
      // Add gallery images
      if (deletedBook.images && deletedBook.images.length > 0) {
        imagesToDelete.push(...deletedBook.images);
      }
      
      // Add primary image if different from gallery images
      if (deletedBook.image && !imagesToDelete.includes(deletedBook.image)) {
        imagesToDelete.push(deletedBook.image);
      }
      
      // Add description images
      if (deletedBook.descriptionImages && deletedBook.descriptionImages.length > 0) {
        imagesToDelete.push(...deletedBook.descriptionImages);
      }

      // Filter for blob URLs and delete them
      const blobUrls = imagesToDelete.filter(url => 
        url && 
        typeof url === 'string' && 
        (url.includes('blob.vercel-storage.com') || url.includes('vercel-storage.com'))
      );

      if (blobUrls.length > 0) {
        try {
          await Promise.all(blobUrls.map(async (url) => {
            try {
              await del(url);
              console.log(`Successfully deleted blob: ${url}`);
            } catch (err) {
              console.error(`Failed to delete blob ${url}:`, err);
            }
          }));
        } catch (err) {
          console.error("Failed to delete some blob images:", err);
        }
      }
    }

    // Revalidate all pages that might show books
    revalidatePath('/')
    revalidatePath('/books')
    revalidatePath('/admin')

    return NextResponse.json(
      {
        success: true,
        message: "Livre supprimé avec succès",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Delete book error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete book",
      },
      { status: 500 },
    )
  }
}
