import Link from 'next/link';
import { LuArrowLeft } from 'react-icons/lu';
import BlurFade from '@/components/blur-fade';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[55vh] flex-col items-center justify-center text-center">
      <BlurFade>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Error 404
        </p>
        <h1 className="mt-4 text-6xl font-semibold tracking-tighter sm:text-8xl">
          <em className="font-serif font-normal">Lost</em> in space
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-muted-foreground">
          This page doesn&apos;t exist, or it moved while nobody was looking.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">
              <LuArrowLeft className="size-4" />
              Back home
            </Link>
          </Button>
        </div>
      </BlurFade>
    </div>
  );
}
