import type { IControl, Map as MapLibreMap } from "maplibre-gl";

export type MapStyle = { label: string; url: string; image: string };

export const MAP_STYLES: MapStyle[] = [
  {
    label: "Standard",
    url: "https://tiles.gebeta.app/styles/standard/style.json",
    image: "/vector.png",
  },
  {
    label: "Raster",
    url: "https://tiles.gebeta.app/styles/raster/raster.json",
    image: "/raster.png",
  },
  {
    label: "Terrain",
    url: "https://tiles.gebeta.app/styles/standard/terrain/terrain.json",
    image: "/terrain.png",
  },
];

const LAYERS_ICON = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>`;

export class StyleControl implements IControl {
  private container?: HTMLDivElement;
  private menu?: HTMLDivElement;
  private readonly onDocumentClick = (event: MouseEvent) => {
    if (this.container && !this.container.contains(event.target as Node)) this.setOpen(false);
  };

  constructor(private readonly styles: MapStyle[]) {}

  onAdd(map: MapLibreMap) {
    const container = document.createElement("div");
    container.className = "maplibregl-ctrl relative";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.title = "Map style";
    toggle.setAttribute("aria-label", "Map style");
    toggle.setAttribute("aria-expanded", "false");
    toggle.className =
      "flex size-[29px] items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors duration-150 hover:bg-raised";
    toggle.innerHTML = LAYERS_ICON;
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      this.setOpen(this.menu?.hidden ?? false);
    });

    const menu = document.createElement("div");
    menu.hidden = true;
    menu.className =
      "absolute top-full right-0 z-10 mt-2 w-40 rounded-lg border border-border bg-card p-1";

    for (const style of this.styles) {
      const item = document.createElement("button");
      item.type = "button";
      item.className =
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] text-foreground transition-colors duration-150 hover:bg-hover";
      const image = document.createElement("img");
      image.src = style.image;
      image.alt = "";
      image.className = "size-5 rounded-sm";
      const label = document.createElement("span");
      label.textContent = style.label;
      item.append(image, label);
      item.addEventListener("click", () => {
        map.setStyle(style.url);
        this.setOpen(false);
      });
      menu.append(item);
    }

    container.append(toggle, menu);
    document.addEventListener("click", this.onDocumentClick);
    this.container = container;
    this.menu = menu;
    return container;
  }

  onRemove() {
    document.removeEventListener("click", this.onDocumentClick);
    this.container?.remove();
  }

  private setOpen(open: boolean) {
    if (!this.menu) return;
    this.menu.hidden = !open;
    this.container?.querySelector("button")?.setAttribute("aria-expanded", String(open));
  }
}

export class LogoControl implements IControl {
  private container?: HTMLDivElement;

  onAdd() {
    const container = document.createElement("div");
    container.className = "maplibregl-ctrl";
    const logo = document.createElement("img");
    logo.src = "/assets/logo.svg";
    logo.alt = "Gebeta Maps";
    logo.width = 24;
    logo.height = 24;
    container.append(logo);
    this.container = container;
    return container;
  }

  onRemove() {
    this.container?.remove();
  }
}
