import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Variant = "fade-up" | "fade" | "scale" | "fade-left" | "fade-right";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: Variant;
  once?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
}

const initial: Record<Variant, string> = {
  "fade-up": "opacity-0 translate-y-8",
  fade: "opacity-0",
  scale: "opacity-0 scale-95",
  "fade-left": "opacity-0 -translate-x-8",
  "fade-right": "opacity-0 translate-x-8",
};

export function Reveal({
  children,
  delay = 0,
  duration = 700,
  variant = "fade-up",
  once = false,
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

  const style: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionProperty: "opacity, transform",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    willChange: "opacity, transform",
  };

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      style={style}
      className={`${visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : initial[variant]} ${className}`}
    >
      {children}
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
