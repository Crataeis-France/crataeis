import Image, { type StaticImageData } from "next/image";

type Props = {
  imageSrc: StaticImageData;
  imageAlt: string;
  children: React.ReactNode;
};

export function ServiceShowcaseShell({ imageSrc, imageAlt, children }: Props) {
  return (
    <div className="group relative min-h-[min(22rem,65dvh)] w-full overflow-hidden rounded-xl bg-mkt-surface-container sm:min-h-[26rem] lg:min-h-[600px] lg:w-2/3">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="scale-105 object-cover grayscale opacity-30 transition-transform duration-[2000ms] group-hover:scale-100"
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mkt-surface-container via-mkt-surface-container/60 to-transparent" />
      </div>
      <div className="relative z-10 flex max-w-2xl flex-col justify-start p-5 sm:p-8 md:p-12 lg:justify-end lg:p-20">
        {children}
      </div>
    </div>
  );
}
