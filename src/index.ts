/**
 * The design system's front door.
 *
 * Everything the outside world should be able to use is re-exported here, so
 * an app can write one tidy import:
 *   import { Button, Hero, Footer } from 'demo-design-system';
 *
 * Remember to import the stylesheet once too, at the top level of your app:
 *   import 'demo-design-system/src/styles/tokens.css';
 */

export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonState } from './components/Button';

export { Logo } from './components/Logo';
export type { LogoProps } from './components/Logo';

export { Menu } from './components/Menu';
export type { MenuProps, MenuState } from './components/Menu';

export { Navigation } from './components/Navigation';
export type { NavigationProps, NavLink } from './components/Navigation';

export { Hero } from './components/Hero';
export type { HeroProps } from './components/Hero';

export { About } from './components/About';
export type { AboutProps } from './components/About';

export { ProjectCard } from './components/ProjectCard';
export type { ProjectCardProps } from './components/ProjectCard';

export { SkillItem } from './components/SkillItem';
export type { SkillItemProps } from './components/SkillItem';

export { Skills } from './components/Skills';
export type { SkillsProps } from './components/Skills';

export { Footer } from './components/Footer';
export type { FooterProps, FooterLink } from './components/Footer';
