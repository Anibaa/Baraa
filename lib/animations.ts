export const animationVariants = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },

  // Section reveals
  sectionReveal: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
  },

  // Card interactions
  cardHover: {
    whileHover: { y: -8, transition: { duration: 0.3 } },
    whileTap: { scale: 0.98 },
  },

  // Button press
  buttonPress: {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.05, boxShadow: "0 8px 24px rgba(23, 66, 248, 0.12)" },
  },

  // Loading skeleton
  shimmer: {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
    transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" as const },
  },

  // Staggered list
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.05 },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
}

export const customEase = {
  smooth: [0.4, 0, 0.2, 1],
  bouncy: [0.68, -0.55, 0.265, 1.55],
}
