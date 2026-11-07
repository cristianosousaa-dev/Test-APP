"use client";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { FAQS } from "@/lib/faq";

export function AnimatedFaq() {
  const [active, setActive] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="faq-list animated-faq" data-reveal>
      {FAQS.map((faq, i) => (
        <div className="faq-disclosure" key={faq.q} data-open={active === i}>
          <h3>
            <button
              type="button"
              id={`${id}-question-${i}`}
              aria-expanded={active === i}
              aria-controls={`${id}-answer-${i}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <span>{faq.q}</span>
              <Plus size={20} />
            </button>
          </h3>
          <section
            className="faq-answer"
            id={`${id}-answer-${i}`}
            aria-labelledby={`${id}-question-${i}`}
            inert={active !== i}
          >
            <div>
              <p>{faq.a}</p>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
