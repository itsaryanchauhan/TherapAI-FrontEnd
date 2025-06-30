
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const logos = [
  "https://preview.cruip.com/stellar/images/client-01.svg",
  "https://preview.cruip.com/stellar/images/client-02.svg",
  "https://preview.cruip.com/stellar/images/client-03.svg",
  "https://preview.cruip.com/stellar/images/client-04.svg",
  "https://preview.cruip.com/stellar/images/client-05.svg",
  "https://preview.cruip.com/stellar/images/client-06.svg",
  "https://preview.cruip.com/stellar/images/client-07.svg",
  "https://preview.cruip.com/stellar/images/client-08.svg",
  "https://preview.cruip.com/stellar/images/client-09.svg",
];

const LogoCard = ({ src }: { src: string }) => {
  return (
    <div className={cn(
      "relative h-20 w-40 mx-4",
      "flex items-center justify-center"
    )}>
      <img 
        src={src}
        alt="Company logo"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex mask-x-from-70% mask-x-to-85% w-full items-center min-h-[10vh]  justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {logos.map((logo, i) => (
            <LogoCard key={i} src={logo} />
          ))}
        </Marquee>
    </div>
  );
}
