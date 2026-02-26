import { useEffect, useRef, useState } from "react";

type Currency = "EUR" | "USD";
type SortDefault = "newest" | "price_asc" | "price_desc";

type SettingsModel = {
  // 1) Algemene Shop Instellingen
  shopName: string;
  tagline: string;
  supportEmail: string;
  phone: string;
  address: string;

  // 2) Valuta instellingen
  currency: Currency;
  vatPercent: number; // e.g. 21
  pricesIncludeVat: boolean;

  // 3) Feature toggles
  features: {
    cart: boolean;
    checkout: boolean;
    reviews: boolean;
    wishlist: boolean;
    discounts: boolean;
    stripe: boolean;
  };

  // 4) Onderhoudsmodus
  maintenanceMode: boolean;
  maintenanceMessage: string;

  // 5) Beveiliging
  minPasswordLength: number; // e.g. 8
  requireSpecialChar: boolean;
  sessionTimeoutMinutes: number; // e.g. 60

  // 6) Productinstellingen
  itemsPerPage: number; // e.g. 12
  defaultSort: SortDefault;
  showOutOfStock: boolean;
};

const STORAGE_KEY = "admin-settings";

const defaultSettings: SettingsModel = {
  shopName: "Brightest",
  tagline: "AIM HIGH",
  supportEmail: "support@brightest.be",
  phone: "+32 000 00 00 00",
  address: "Gent, België",

  currency: "EUR",
  vatPercent: 21,
  pricesIncludeVat: true,

  features: {
    cart: true,
    checkout: true,
    reviews: false,
    wishlist: false,
    discounts: false,
    stripe: false,
  },

  maintenanceMode: false,
  maintenanceMessage: "We zijn even bezig met onderhoud. Kom straks terug.",

  minPasswordLength: 8,
  requireSpecialChar: true,
  sessionTimeoutMinutes: 60,

  itemsPerPage: 12,
  defaultSort: "newest",
  showOutOfStock: true,
};

function loadSettings(): SettingsModel {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw) as Partial<SettingsModel>;
    // merge shallow + nested features
    return {
      ...defaultSettings,
      ...parsed,
      features: { ...defaultSettings.features, ...(parsed.features ?? {}) },
    };
  } catch {
    return defaultSettings;
  }
}

function saveSettings(settings: SettingsModel) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-slate-800">{children}</label>;
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-300"
    />
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`h-8 w-14 rounded-full px-1 transition ${
        checked ? "bg-emerald-500" : "bg-slate-300"
      }`}
      aria-pressed={checked}
    >
      <div
        className={`h-6 w-6 rounded-full bg-white transition ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsModel>(() => loadSettings());
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveSettings(settings);
  }, [settings]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Instellingen</h1>
          <p className="mt-2 text-slate-600">
            Beheer je shop-configuratie. Wijzigingen worden automatisch opgeslagen.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <p className="font-semibold text-slate-900">Status</p>
          <p className="text-slate-600">Auto-opgeslagen</p>
          <button
            type="button"
            onClick={() => setSettings(defaultSettings)}
            className="mt-3 w-full rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
          >
            Reset naar standaard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* 1) Algemene Shop Instellingen */}
        <Card
          title="Algemene shopinstellingen"
          subtitle="Basisinformatie die in je shop of footer kan verschijnen."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Shopnaam</FieldLabel>
              <Input
                value={settings.shopName}
                onChange={(v) => setSettings((s) => ({ ...s, shopName: v }))}
                placeholder="Bijv. Brightest"
              />
            </div>

            <div>
              <FieldLabel>Tagline</FieldLabel>
              <Input
                value={settings.tagline}
                onChange={(v) => setSettings((s) => ({ ...s, tagline: v }))}
                placeholder="Bijv. AIM HIGH"
              />
            </div>

            <div>
              <FieldLabel>Support e-mail</FieldLabel>
              <Input
                value={settings.supportEmail}
                onChange={(v) => setSettings((s) => ({ ...s, supportEmail: v }))}
                placeholder="support@..."
                type="email"
              />
            </div>

            <div>
              <FieldLabel>Telefoon</FieldLabel>
              <Input
                value={settings.phone}
                onChange={(v) => setSettings((s) => ({ ...s, phone: v }))}
                placeholder="+32 ..."
              />
            </div>

            <div className="sm:col-span-2">
              <FieldLabel>Adres</FieldLabel>
              <Input
                value={settings.address}
                onChange={(v) => setSettings((s) => ({ ...s, address: v }))}
                placeholder="Straat, stad, land"
              />
            </div>
          </div>
        </Card>

        {/* 2) Valuta instellingen */}
        <Card
          title="Valuta-instellingen"
          subtitle="Stuur valuta en btw-logica aan voor prijzen."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>Valuta</FieldLabel>
              <select
                value={settings.currency}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, currency: e.target.value as Currency }))
                }
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            <div>
              <FieldLabel>BTW (%)</FieldLabel>
              <Input
                value={settings.vatPercent}
                type="number"
                onChange={(v) =>
                  setSettings((s) => ({
                    ...s,
                    vatPercent: Number.isFinite(Number(v)) ? Number(v) : s.vatPercent,
                  }))
                }
                placeholder="21"
              />
            </div>

            <div className="flex items-end justify-between rounded-xl border border-slate-200 p-3">
              <div>
                <FieldLabel>Prijzen incl. btw</FieldLabel>
                <p className="mt-1 text-xs text-slate-500">
                  Toon prijzen inclusief btw.
                </p>
              </div>
              <Toggle
                checked={settings.pricesIncludeVat}
                onChange={(v) => setSettings((s) => ({ ...s, pricesIncludeVat: v }))}
              />
            </div>
          </div>
        </Card>

        {/* 3) Feature toggles */}
        <Card
          title="Functies aan/uit"
          subtitle="Zet features tijdelijk uit zonder code te verwijderen."
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(
              [
                ["cart", "Winkelmand"],
                ["checkout", "Afrekenen"],
                ["reviews", "Reviews"],
                ["wishlist", "Wishlist"],
                ["discounts", "Kortingen"],
                ["stripe", "Stripe betalingen"],
              ] as const
            ).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500">feature: {key}</p>
                </div>
                <Toggle
                  checked={settings.features[key]}
                  onChange={(v) =>
                    setSettings((s) => ({
                      ...s,
                      features: { ...s.features, [key]: v },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        {/* 4) Onderhoudsmodus */}
        <Card
          title="Onderhoudsmodus"
          subtitle="Schakel je shop tijdelijk uit met een nette boodschap."
        >
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-slate-900">Onderhoudsmodus</p>
              <p className="text-sm text-slate-600">
                Als dit aan staat, toon je een onderhoudspagina.
              </p>
            </div>
            <Toggle
              checked={settings.maintenanceMode}
              onChange={(v) => setSettings((s) => ({ ...s, maintenanceMode: v }))}
            />
          </div>

          <div className="mt-4">
            <FieldLabel>Onderhoudsbericht</FieldLabel>
            <textarea
              value={settings.maintenanceMessage}
              onChange={(e) =>
                setSettings((s) => ({ ...s, maintenanceMessage: e.target.value }))
              }
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-300"
              rows={3}
              placeholder="Typ hier je bericht..."
            />
          </div>
        </Card>

        {/* 5) Beveiliging */}
        <Card
          title="Beveiliging"
          subtitle="Basisregels voor wachtwoorden en sessies."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>Minimum wachtwoordlengte</FieldLabel>
              <Input
                value={settings.minPasswordLength}
                type="number"
                onChange={(v) =>
                  setSettings((s) => ({
                    ...s,
                    minPasswordLength: Number.isFinite(Number(v))
                      ? Number(v)
                      : s.minPasswordLength,
                  }))
                }
                placeholder="8"
              />
            </div>

            <div>
              <FieldLabel>Sessie timeout (minuten)</FieldLabel>
              <Input
                value={settings.sessionTimeoutMinutes}
                type="number"
                onChange={(v) =>
                  setSettings((s) => ({
                    ...s,
                    sessionTimeoutMinutes: Number.isFinite(Number(v))
                      ? Number(v)
                      : s.sessionTimeoutMinutes,
                  }))
                }
                placeholder="60"
              />
            </div>

            <div className="flex items-end justify-between rounded-xl border border-slate-200 p-3">
              <div>
                <FieldLabel>Speciale tekens verplicht</FieldLabel>
                <p className="mt-1 text-xs text-slate-500">Bijv. ! @ # $</p>
              </div>
              <Toggle
                checked={settings.requireSpecialChar}
                onChange={(v) => setSettings((s) => ({ ...s, requireSpecialChar: v }))}
              />
            </div>
          </div>
        </Card>

        {/* 6) Productinstellingen */}
        <Card
          title="Productinstellingen"
          subtitle="Beheer paging, sortering en voorraadweergave."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel>Items per pagina</FieldLabel>
              <Input
                value={settings.itemsPerPage}
                type="number"
                onChange={(v) =>
                  setSettings((s) => ({
                    ...s,
                    itemsPerPage: Number.isFinite(Number(v)) ? Number(v) : s.itemsPerPage,
                  }))
                }
                placeholder="12"
              />
            </div>

            <div>
              <FieldLabel>Standaard sortering</FieldLabel>
              <select
                value={settings.defaultSort}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, defaultSort: e.target.value as SortDefault }))
                }
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="newest">Nieuwste eerst</option>
                <option value="price_asc">Prijs (laag → hoog)</option>
                <option value="price_desc">Prijs (hoog → laag)</option>
              </select>
            </div>

            <div className="flex items-end justify-between rounded-xl border border-slate-200 p-3">
              <div>
                <FieldLabel>Toon uitverkochte producten</FieldLabel>
                <p className="mt-1 text-xs text-slate-500">Ook als voorraad 0 is.</p>
              </div>
              <Toggle
                checked={settings.showOutOfStock}
                onChange={(v) => setSettings((s) => ({ ...s, showOutOfStock: v }))}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}