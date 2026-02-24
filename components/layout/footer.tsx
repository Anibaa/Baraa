import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">براءة</h3>
            <p className="text-sm opacity-80">العلامة التجارية للأزياء النسائية التي تحتفي بالأناقة والأسلوب العصري</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm md:text-base">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/books" className="hover:opacity-80 transition-opacity">
                  المجموعات
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:opacity-80 transition-opacity">
                  كن شريكاً
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:opacity-80 transition-opacity">
                  الإدارة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm md:text-base">السياسات</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm md:text-base">تابعنا</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-sm opacity-80">© 2026 براءة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
