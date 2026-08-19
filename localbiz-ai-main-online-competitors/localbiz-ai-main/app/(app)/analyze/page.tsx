'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Upload,
  ImageIcon,
  MapPin,
  Sparkles,
  Loader2,
  X,
  Info,
} from 'lucide-react'
import { api } from '@/services/api'
import { useLanguage } from '@/components/language-provider'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const translations = {
  en: {
    info:
      'Add a product photo and a few details. Our AI will tell you the best price, demand, and how to market it. We’ve pre-filled a sample raincoat so you can try it instantly.',
    productPhoto: 'Product photo',
    photoDescription:
      'A clear photo helps the AI identify your product.',
    uploadPhoto: 'Tap to upload a photo',
    imageFormat: 'JPG or PNG, up to 10MB',
    change: 'Change',
    removePhoto: 'Remove photo',
    productDetails: 'Product details',
    priceDescription:
      'Prices in rupees (₹). All fields are required.',
    productName: 'Product name',
    productPlaceholder: 'e.g. Premium Rain Coat',
    purchaseCost: 'Purchase cost (₹)',
    sellingPrice: 'Selling price (₹)',
    stockAvailable: 'Stock available',
    shopLocation: 'Shop location',
    locationPlaceholder: 'e.g. Andheri, Mumbai',
    analyze: 'Analyze product',
    analyzing: 'Analyzing...',
    takesSeconds: 'Takes just a few seconds',
    analyzingProduct: 'Analyzing your product',
    wait: 'This won’t take long',
    steps: [
      'Identifying the product from your photo',
      'Checking online competitor prices',
      'Reading local weather & demand signals',
      'Calculating your best price & offer',
    ],
  },

  ta: {
    info:
      'ஒரு பொருளின் புகைப்படத்தையும் சில விவரங்களையும் சேர்க்கவும். சிறந்த விலை, தேவை மற்றும் அதை எப்படி மார்க்கெட்டிங் செய்வது என்பதை எங்கள் AI உங்களுக்குத் தெரிவிக்கும். உடனடியாக முயற்சி செய்ய ஒரு மாதிரி ரெயின்கோட் ஏற்கனவே நிரப்பப்பட்டுள்ளது.',
    productPhoto: 'பொருளின் புகைப்படம்',
    photoDescription:
      'தெளிவான புகைப்படம் உங்கள் பொருளை AI சரியாக அடையாளம் காண உதவும்.',
    uploadPhoto: 'புகைப்படத்தை பதிவேற்ற தட்டவும்',
    imageFormat: 'JPG அல்லது PNG, அதிகபட்சம் 10MB',
    change: 'மாற்று',
    removePhoto: 'புகைப்படத்தை நீக்கு',
    productDetails: 'பொருள் விவரங்கள்',
    priceDescription:
      'விலைகள் ரூபாயில் (₹). அனைத்து விவரங்களும் அவசியம்.',
    productName: 'பொருளின் பெயர்',
    productPlaceholder: 'எ.கா. Premium Rain Coat',
    purchaseCost: 'வாங்கிய விலை (₹)',
    sellingPrice: 'விற்பனை விலை (₹)',
    stockAvailable: 'கையிருப்பு',
    shopLocation: 'கடை அமைவிடம்',
    locationPlaceholder: 'எ.கா. Andheri, Mumbai',
    analyze: 'பொருளை ஆய்வு செய்',
    analyzing: 'ஆய்வு செய்யப்படுகிறது...',
    takesSeconds: 'சில விநாடிகள் மட்டுமே ஆகும்',
    analyzingProduct: 'உங்கள் பொருள் ஆய்வு செய்யப்படுகிறது',
    wait: 'சிறிது நேரம் காத்திருக்கவும்',
    steps: [
      'உங்கள் புகைப்படத்திலிருந்து பொருளை அடையாளம் காண்கிறது',
      'ஆன்லைன் போட்டியாளர்களின் விலைகளை சரிபார்க்கிறது',
      'உள்ளூர் வானிலை மற்றும் தேவையை ஆய்வு செய்கிறது',
      'சிறந்த விலை மற்றும் சலுகையை கணக்கிடுகிறது',
    ],
  },
} as const

export default function AnalyzePage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguage()

  const t = translations[language]

  const [preview, setPreview] = useState<string | null>(
    '/products/raincoat.png',
  )

  const [analyzing, setAnalyzing] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const [form, setForm] = useState({
    name: 'Premium Rain Coat',
    cost: '500',
    price: '700',
    stock: '25',
    location: 'Andheri, Mumbai',
  })

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()

    setAnalyzing(true)
    setActiveStep(0)

    const interval = setInterval(() => {
      setActiveStep((s) =>
        Math.min(s + 1, t.steps.length - 1),
      )
    }, 380)

    try {
      await api.analyzeProduct({
        name: form.name,
        cost: Number(form.cost),
        price: Number(form.price),
        stock: Number(form.stock),
        location: form.location,
        imageDataUrl: preview ?? undefined,
      })

      clearInterval(interval)

      router.push('/analyze/results')
    } catch (error) {
      clearInterval(interval)
      console.error('Product analysis failed:', error)
      setAnalyzing(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-primary" />

        <p className="text-sm text-muted-foreground">
          {t.info}
        </p>
      </div>

      <form onSubmit={handleAnalyze}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Image upload */}
          <Card>
            <CardHeader>
              <CardTitle>{t.productPhoto}</CardTitle>

              <CardDescription>
                {t.photoDescription}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFile}
                aria-label={t.productPhoto}
              />

              {preview ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted">
                  <Image
                    src={preview}
                    alt={t.productPhoto}
                    fill
                    className="object-cover"
                    sizes="400px"
                    unoptimized
                  />

                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg bg-background/90 text-muted-foreground shadow-sm hover:text-foreground"
                    aria-label={t.removePhoto}
                  >
                    <X className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-background"
                  >
                    <Upload className="size-4" />
                    {t.change}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/40 text-center transition-colors hover:border-primary/50 hover:bg-muted"
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                    <ImageIcon className="size-6" />
                  </span>

                  <span className="text-sm font-medium">
                    {t.uploadPhoto}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {t.imageFormat}
                  </span>
                </button>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>{t.productDetails}</CardTitle>

              <CardDescription>
                {t.priceDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">
                  {t.productName}
                </Label>

                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder={t.productPlaceholder}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="cost">
                    {t.purchaseCost}
                  </Label>

                  <Input
                    id="cost"
                    type="number"
                    min={0}
                    required
                    value={form.cost}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        cost: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">
                    {t.sellingPrice}
                  </Label>

                  <Input
                    id="price"
                    type="number"
                    min={0}
                    required
                    value={form.price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="stock">
                  {t.stockAvailable}
                </Label>

                <Input
                  id="stock"
                  type="number"
                  min={0}
                  required
                  value={form.stock}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      stock: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="location">
                  <MapPin className="size-3.5" />
                  {t.shopLocation}
                </Label>

                <Input
                  id="location"
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                  placeholder={t.locationPlaceholder}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <Button
            type="submit"
            size="lg"
            disabled={analyzing}
            className="h-12 w-full max-w-sm px-6 text-base"
          >
            {analyzing ? (
              <>
                <Loader2 className="animate-spin" />
                {t.analyzing}
              </>
            ) : (
              <>
                <Sparkles />
                {t.analyze}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            {t.takesSeconds}
          </p>
        </div>
      </form>

      {analyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Sparkles className="size-5" />
                </span>

                <div>
                  <p className="font-display font-semibold">
                    {t.analyzingProduct}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {t.wait}
                  </p>
                </div>
              </div>

              <ul className="mt-5 flex flex-col gap-3">
                {t.steps.map((step, i) => {
                  const done = i < activeStep
                  const active = i === activeStep

                  return (
                    <li
                      key={step}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={
                          'flex size-6 shrink-0 items-center justify-center rounded-full border ' +
                          (done
                            ? 'border-success bg-success/15 text-success'
                            : active
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border text-muted-foreground')
                        }
                      >
                        {done ? (
                          '✓'
                        ) : active ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          i + 1
                        )}
                      </span>

                      <span
                        className={
                          done || active
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {step}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
