export function SceneBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl animate-blob animation-delay-4000" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}
