/**
 * HomePage
 *
 * This is the page from the Figma "✏️ Design" page, assembled out of the
 * design system components.
 *
 * THE WHOLE IDEA
 * Notice how little is going on here. There is no styling in this file at
 * all - no colours, no spacing, no layout rules. Building a page is just
 * stacking finished components in order and handing each one its content.
 * That is what a design system buys you.
 *
 * WHAT IS ON THE PAGE, top to bottom (straight from Figma):
 *   Navigation -> Hero -> four ProjectCards -> About -> Skills -> Footer
 *
 * The four cards alternate their tinted background on/off, which is what
 * creates the banded stripes you see down the page in the design.
 */

import { useState } from 'react';
import {
  Navigation,
  Hero,
  ProjectCard,
  About,
  Skills,
  Footer,
} from './index';
import { useBreakpoint } from './useBreakpoint';
import styles from './HomePage.module.css';

/**
 * The four projects, as data rather than as repeated JSX.
 *
 * WHY A LIST?
 * The four cards in Figma are identical apart from their title and whether
 * the background is on. Writing <ProjectCard> out four times would mean
 * changing four places every time something about a card changes. A list plus
 * one <ProjectCard> means there is only ever one place to change.
 *
 * `hasBG` alternates - true on the 2nd and 4th - exactly as in the design.
 */
const projects = [
  { headline: 'moonblocks', hasBG: false },
  { headline: 'Alpine Tracker', hasBG: true },
  { headline: 'Soft Agents', hasBG: false },
  { headline: 'Web Template', hasBG: true },
];

/** Every card shares this description in the Figma design. */
const projectDescription =
  'I run moonlearning.io, a hands-on learning platform for UI design, Figma, and AI-powered product building. I cut through the noise and help people move from overthinking to designing and building.';

export function HomePage() {
  // One line, and the whole page becomes responsive: this reads the real
  // window width and every component below receives the right layout.
  const breakpoint = useBreakpoint();

  // `useState` lets the page remember whether the mobile menu is open.
  // `menuOpen` is the current answer; `setMenuOpen` is how you change it.
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <main> marks the main content of the page, so screen reader users can
    // skip straight past the navigation to get to it.
    <main className={styles.page}>
      <Navigation
        breakpoint={breakpoint}
        ctaLabel="contact"
        menuOpen={menuOpen}
        // Flip the remembered value: if it was open, close it, and vice versa.
        onMenuClick={() => setMenuOpen(!menuOpen)}
        links={[
          { label: 'about.', href: '#about' },
          { label: 'work.', href: '#work' },
          { label: 'blog.', href: '#blog' },
        ]}
      />

      <Hero
        breakpoint={breakpoint}
        subtitle="James Jones"
        headline={'UX. UI. \nAgentic AI.'}
      />

      {/* `.map()` runs once per project and produces one card each. */}
      <section id="work">
        {projects.map((project) => (
          <ProjectCard
            key={project.headline}
            breakpoint={breakpoint}
            headline={project.headline}
            description={projectDescription}
            hasBG={project.hasBG}
            linkHref={`#${project.headline.toLowerCase().replace(/\s+/g, '-')}`}
          />
        ))}
      </section>

      {/* The `id` matches the "about." link in the navigation, so clicking it
        * scrolls here. */}
      <div id="about">
        <About
          breakpoint={breakpoint}
          headline="About me"
          description="Welcome to my portfolio! I'm Kim, a passionate graphic UI designer dedicated to crafting visual experiences that resonate with users. My goal is to design interfaces that not only grab attention but also facilitate smooth navigation. I carefully select colour palettes that evoke the right emotions and typography that enhances clarity. I believe that intuitive design is key to guiding users effortlessly on their journey."
          buttonLabel="Contact"
        />
      </div>

      <Skills breakpoint={breakpoint} />

      <Footer
        breakpoint={breakpoint}
        copyright="© 2026 Christine Vallaure"
        links={[
          { label: 'Imprint', href: '#imprint' },
          { label: 'Contact', href: '#contact' },
        ]}
      />
    </main>
  );
}
