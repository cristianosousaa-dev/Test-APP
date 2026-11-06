"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { briefServices } from "@/lib/brief-context";

const options = ["", ...briefServices];
const optionLabel = (value: string) => value || "Explorar uma solução";

/** A themed select-only combobox: one focus stop, with listbox keyboard navigation. */
export function ServiceSelect({
  id,
  labelledBy,
  value,
  onChange,
}: {
  id: string;
  labelledBy: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({ value: "", at: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [side, setSide] = useState("bottom");
  const selected = Math.max(0, options.indexOf(value));
  const reveal = (index = selected) => {
    const rect = trigger.current?.getBoundingClientRect();
    setSide(rect && innerHeight - rect.bottom < 220 && rect.top > 220 ? "top" : "bottom");
    setActive(index);
    setOpen(true);
  };
  const choose = (index: number) => {
    onChange(options[index] ?? "");
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return (
    <div ref={root} className="service-picker" data-open={open} data-side={side}>
      <input type="hidden" name="servico" value={value} />
      <button
        ref={trigger}
        id={id}
        className="service-picker-trigger"
        type="button"
        role="combobox"
        aria-labelledby={labelledBy}
        aria-describedby={`${id}-value`}
        aria-haspopup="listbox"
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        onBlur={(event) => {
          if (!root.current?.contains(event.relatedTarget)) setOpen(false);
        }}
        onClick={() => {
          if (open) setOpen(false);
          else reveal();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            if (open) event.preventDefault();
            setOpen(false);
            return;
          }
          if (event.key === "Tab") {
            setOpen(false);
            return;
          }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) reveal();
            else
              setActive(
                (current) =>
                  (current + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
                  options.length,
              );
            return;
          }
          if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            reveal(event.key === "Home" ? 0 : options.length - 1);
            return;
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) choose(active);
            else reveal();
            return;
          }
          if (event.key.length === 1 && !event.altKey && !event.metaKey && !event.ctrlKey) {
            event.preventDefault();
            const now = Date.now();
            const query =
              (now - search.current.at < 700 ? search.current.value : "") +
              event.key.toLocaleLowerCase("pt");
            search.current = { value: query, at: now };
            const match = options.findIndex((option) =>
              optionLabel(option).toLocaleLowerCase("pt").startsWith(query),
            );
            if (match >= 0) reveal(match);
          }
        }}
      >
        <span id={`${id}-value`}>{optionLabel(value)}</span>
        <ChevronDown size={13} />
      </button>
      <div className="service-picker-popup" inert={!open}>
        <div role="listbox" id={`${id}-options`} aria-labelledby={labelledBy}>
          {options.map((option, index) => (
            <div
              key={option || "general"}
              role="option"
              tabIndex={-1}
              id={`${id}-option-${index}`}
              aria-selected={value === option}
              data-active={active === index}
              onPointerMove={() => setActive(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  choose(index);
                }
              }}
            >
              <span>{optionLabel(option)}</span>
              <Check size={13} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
