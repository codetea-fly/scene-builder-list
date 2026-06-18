import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { ModelAsset } from "@/lib/data-assets";

// Lightweight 3D preview using a rotating CSS 3D cuboid/sphere placeholder.
// (Avoids pulling in three.js for a demo preview.)
function PreviewShape({ m }: { m: ModelAsset }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.6;
      if (ref.current) ref.current.style.transform = `rotateX(${20 + Math.sin(t / 60) * 10}deg) rotateY(${t}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const faces = (() => {
    const c = m.color;
    if (m.geometry === "sphere") {
      return (
        <div className="absolute inset-0" style={{ borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${c}cc, ${c}33 60%, ${c}11 80%)`, boxShadow: `inset -30px -30px 60px rgba(0,0,0,0.25), 0 20px 40px ${c}33` }} />
      );
    }
    if (m.geometry === "torus") {
      return (
        <div className="absolute inset-0 rounded-full border-[40px]" style={{ borderColor: c, boxShadow: `0 0 60px ${c}66` }} />
      );
    }
    if (m.geometry === "cone") {
      return (
        <div className="absolute left-1/2 top-0 -translate-x-1/2" style={{ width: 0, height: 0, borderLeft: "100px solid transparent", borderRight: "100px solid transparent", borderBottom: `200px solid ${c}`, filter: `drop-shadow(0 0 30px ${c}88)` }} />
      );
    }
    if (m.geometry === "cylinder") {
      return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 140, height: 200, background: `linear-gradient(90deg, ${c}55, ${c}, ${c}55)`, borderRadius: "30px / 14px", boxShadow: `0 0 40px ${c}66` }} />
      );
    }
    // box
    const side = 140;
    const half = side / 2;
    const face = (transform: string, op = 1) => (
      <div className="absolute" style={{ width: side, height: side, left: `calc(50% - ${half}px)`, top: `calc(50% - ${half}px)`, background: c, opacity: op, transform, boxShadow: `inset 0 0 30px rgba(0,0,0,0.2)` }} />
    );
    return (
      <>
        {face(`translateZ(${half}px)`, 0.95)}
        {face(`rotateY(180deg) translateZ(${half}px)`, 0.85)}
        {face(`rotateY(90deg) translateZ(${half}px)`, 0.7)}
        {face(`rotateY(-90deg) translateZ(${half}px)`, 0.7)}
        {face(`rotateX(90deg) translateZ(${half}px)`, 0.6)}
        {face(`rotateX(-90deg) translateZ(${half}px)`, 0.55)}
      </>
    );
  })();

  return (
    <div className="relative h-full w-full [perspective:900px]">
      <div ref={ref} className="relative left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]">
        <div className="relative -translate-x-1/2 -translate-y-1/2" style={{ width: 0, height: 0 }}>
          <div className="absolute left-0 top-0 [transform-style:preserve-3d]">{faces}</div>
        </div>
      </div>
      {/* Grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 [perspective:600px]">
        <div className="absolute inset-0 origin-bottom [transform:rotateX(65deg)] bg-[linear-gradient(to_right,rgba(14,165,233,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.4)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_top,black_20%,transparent_75%)]" />
      </div>
    </div>
  );
}

export function ModelPreviewDialog({ model, onClose }: { model: ModelAsset; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-slate-600 shadow hover:bg-white">
          <X className="h-4 w-4" />
        </button>
        <div className="relative h-[440px] bg-gradient-to-br from-sky-50 via-white to-blue-50">
          <PreviewShape m={model} />
        </div>
        <div className="border-t border-sky-100 bg-white/80 p-6">
          <div className="font-mono text-xs text-sky-500">{model.id}</div>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{model.name}</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-xl bg-sky-50 px-3 py-2"><div className="text-[11px] text-slate-500">分类</div><div className="font-medium text-slate-800">{model.category}</div></div>
            <div className="rounded-xl bg-sky-50 px-3 py-2"><div className="text-[11px] text-slate-500">格式</div><div className="font-medium text-slate-800">{model.format}</div></div>
            <div className="rounded-xl bg-sky-50 px-3 py-2"><div className="text-[11px] text-slate-500">体积</div><div className="font-medium text-slate-800">{model.size}</div></div>
            <div className="rounded-xl bg-sky-50 px-3 py-2"><div className="text-[11px] text-slate-500">三角面</div><div className="font-medium text-slate-800">{model.triangles}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useModelPreview() {
  const [model, setModel] = useState<ModelAsset | null>(null);
  return {
    open: (m: ModelAsset) => setModel(m),
    node: model ? <ModelPreviewDialog model={model} onClose={() => setModel(null)} /> : null,
  };
}
