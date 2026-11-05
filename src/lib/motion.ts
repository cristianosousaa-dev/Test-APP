import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* One GSAP instance with ScrollTrigger registered once. Client components only. */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
