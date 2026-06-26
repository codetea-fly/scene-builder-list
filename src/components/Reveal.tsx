import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Variant =
  | "fade-up"
  | "fade-down"
  | "fade"
  | "scale"
  | "fade-left"
  | "fade-right"
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "slide-down";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: Variant;
  once?: boolean;
  className?: string;
  as?: ElementType;
  threshold?: number;
}

interface VariantSpec {
  hidden: { transform: string; opacity: number };
}

const variants: Record<Variant, VariantSpec> = {
  "fade-up": { hidden: { transform: "translate3d(0, 32px, 0)", opacity: 0 } },
  "fade-down": { hidden: { transform: "translate3d(0, -32px, 0)", opacity: 0 } },
  fade: { hidden: { transform: "none", opacity: 0 } },
  scale: { hidden: { transform: "scale(0.95)", opacity: 0 } },
  "fade-left": { hidden: { transform: "translate3d(-32px, 0, 0)", opacity: 0 } },
  "fade-right": { hidden: { transform: "translate3d(32px, 0, 0)", opacity: 0 } },
  "slide-left": { hidden: { transform: "translate3d(-140%, 0, 0)", opacity: 1 } },
  "slide-right": { hidden: { transform: "translate3d(140%, 0, 0)", opacity: 1 } },
  "slide-up": { hidden: { transform: "translate3d(0, 140%, 0)", opacity: 1 } },
  "slide-down": { hidden: { transform: "translate3d(0, -140%, 0)", opacity: 1 } },
};

export function Reveal({
  children,
  delay = 0,
  duration = 700,
  variant = "fade-up",
  once = true,
  className = "",
  as: Tag = "div",
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const spec = variants[variant];
  const style: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    willChange: "opacity, transform",
    transform: visible ? "translate3d(0,0,0)" : spec.hidden.transform,
    opacity: visible ? 1 : spec.hidden.opacity,
  };

  const Comp = Tag as any;
  return (
    <Comp ref={ref as any} className={className}>
      <div style={style} className="h-full">
        {children}
      </div>
    </Comp>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({
  end,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(end * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  const formatted = value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
