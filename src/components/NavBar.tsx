import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Boxes } from "lucide-react";

type Leaf = { label: string; to: string };
type Group = { label: string; leaves: Leaf[] };
type MenuEntry = Leaf | Group;

type Menu = {
  label: string;
  to?: string;
  children: MenuEntry[];
};

const MENUS: Menu[] = [
  {
    label: "场景图谱",
    children: [
      { label: "全景式场景图谱", to: "/atlas/overview" },
      { label: "场景需求清单", to: "/atlas/demands" },
    ],
  },
  {
    label: "场景资源社区",
    children: [
      {
        label: "资源库",
        leaves: [
          { label: "解决方案", to: "/community/library/solutions" },
          { label: "规范标准库", to: "/community/library/standards" },
          { label: "开源技术资源库", to: "/community/library/opensource" },
          { label: "案例库", to: "/community/library/cases" },
        ],
      },
      {
        label: "生态圈",
        leaves: [
          { label: "专家库", to: "/community/ecosystem/experts" },
          { label: "大会活动", to: "/community/ecosystem/events" },
        ],
      },
      { label: "创新中心产品体系专题", to: "/community/product-system" },
    ],
  },
  {
    label: "场景创新促进中心",
    children: [
      { label: "场景创新全过程服务体系", to: "/promotion/lifecycle" },
      { label: "场景服务咨询", to: "/promotion/consulting" },
      { label: "场景征集活动", to: "/promotion/collection" },
      { label: "场景成熟度评估中心", to: "/promotion/maturity" },
    ],
  },
  {
    label: "场景创新实验室",
    children: [
      { label: "场景创新广场", to: "/lab/plaza" },
      {
        label: "能力组件中心",
        leaves: [
          { label: "通用能力组件", to: "/lab/capability/components" },
          { label: "通用能力平台", to: "/lab/capability/platforms" },
          { label: "在线体验系统", to: "/lab/capability/experience" },
          { label: "特定领域软硬件", to: "/lab/capability/hardware" },
          { label: "AI+数字孪生能力库", to: "/lab/capability/ai-twin" },
        ],
      },
      {
        label: "数据资产中心",
        leaves: [
          { label: "三维模型库", to: "/lab/data/models" },
          { label: "高质量数据集", to: "/lab/data/datasets" },
          { label: "可归集孪生体资产", to: "/lab/data/twins" },
        ],
      },
    ],
  },
  {
    label: "场景示范体验中心",
    children: [
      { label: "在线体验中心", to: "/demo/online" },
      { label: "SIP实践", to: "/demo/sip" },
      { label: "创新中心示范", to: "/demo/center" },
    ],
  },
];

export function NavBar() {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 220);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-sky-100/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link to="/" className="group flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-300/50 transition-transform group-hover:scale-105">
            <Boxes className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-slate-900">数字孪生场景创新</span>
            <span className="text-[10px] text-slate-500">公共服务平台</span>
          </div>
        </Link>

        <div className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
          {MENUS.map((m) => (
            <div
              key={m.label}
              className="relative"
              onMouseEnter={() => enter(m.label)}
              onMouseLeave={leave}
            >
              <button
                type="button"
                onClick={() => setOpen((prev) => (prev === m.label ? null : m.label))}
                onFocus={() => enter(m.label)}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  open === m.label
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                {m.label}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === m.label ? "rotate-180" : ""}`} />
              </button>
              {open === m.label && (
                <div className="absolute left-0 top-full pt-2 animate-fade-in">
                  <div className="min-w-[260px] overflow-hidden rounded-2xl border border-sky-100 bg-white/95 p-2 shadow-xl shadow-sky-200/40 backdrop-blur-xl">
                    {m.children.map((c) => {
                      if ("leaves" in c) {
                        return (
                          <div key={c.label} className="px-2 py-1.5">
                            <div className="px-3 pb-1 text-sm font-semibold text-sky-600">
                              {c.label}
                            </div>
                            <div className="grid gap-0.5">
                              {c.leaves.map((leaf) => (
                                <Link
                                  key={leaf.to}
                                  to={leaf.to}
                                  onClick={() => setOpen(null)}
                                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
                                >
                                  {leaf.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={c.to} className="px-2 py-1.5">
                          <Link
                            to={c.to}
                            onClick={() => setOpen(null)}
                            className="block rounded-lg px-3 py-1 text-sm font-semibold text-sky-600 transition-colors hover:bg-sky-50 hover:text-sky-700"
                          >
                            {c.label}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Link
          to="/lab/plaza"
          className="ml-auto hidden rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-sky-300/50 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
        >
          进入实验室
        </Link>
      </div>
    </nav>
  );
}
