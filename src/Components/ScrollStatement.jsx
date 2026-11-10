import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

function StatementWord({ word, index, total, scrollProgress, reducedMotion }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollProgress, [start, end], [0.18, 1]);

  if (reducedMotion) {
    return <span className="inline-block mr-2 text-white">{word}</span>;
  }

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mr-2 text-white transition-colors duration-200"
    >
      {word}
    </motion.span>
  );
}

export default function ScrollStatement({
  text = '',
  description = null,
  children = null,
  className = '',
  headingClassName = 'text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl',
  descriptionClassName = 'mt-4 text-base font-normal leading-relaxed text-slate-400'
}) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = useMemo(() => (text ? text.split(' ') : []), [text]);

  return (
    <div ref={containerRef} className={className}>
      <h3 className={headingClassName}>
        {words.map((word, i) => (
          <StatementWord
            key={i}
            word={word}
            index={i}
            total={words.length}
            scrollProgress={scrollYProgress}
            reducedMotion={reducedMotion}
          />
        ))}
      </h3>
      {children ? (
        <div className={descriptionClassName}>{children}</div>
      ) : description ? (
        <p className={descriptionClassName}>{description}</p>
      ) : null}
    </div>
  );
}
