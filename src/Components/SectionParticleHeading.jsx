import { useMemo } from 'react';
import Shuffle from './Shuffle/Shuffle';

export default function SectionParticleHeading({
  text = '',
  title,
  highlight,
  align = 'auto',
  className = '',
  maxWidth = ''
}) {
  const fullText = useMemo(() => {
    let t = title;
    let h = highlight;

    if (!t && text) {
      t = text;
      h = '';
    }

    return `${t || ''} ${h || ''}`.trim();
  }, [text, title, highlight]);

  return (
    <div className={`relative inline-block select-none group/particle-heading ${maxWidth} ${className}`.trim()}>
      <Shuffle
        text={fullText}
        tag="h2"
        effect="slide"
        shuffleDirection="right"
        duration={0.35}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power3.out"
        stagger={0.03}
        threshold={0.15}
        rootMargin="-40px"
        triggerOnce={true}
        triggerOnHover={true}
        hoverRadius={0}
        motionBlur={false}
        respectReducedMotion={true}
        maxDelay={0}
        scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
        loop={false}
        loopDelay={0}
        textAlign={align === 'center' ? 'center' : 'left'}
        className="section-heading-font text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-wider drop-shadow-sm leading-tight transition-colors cursor-pointer hover:text-slate-200"
      />
    </div>
  );
}
