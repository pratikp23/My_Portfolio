import { useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import './FlowingMenu.css';

const ROOT = 'flowing-menu';
const LIST = 'flowing-menu__list';
const ITEM = 'flowing-menu__item';
const DIVIDER = 'flowing-menu__divider';
const LINK = 'flowing-menu__link';
const INDEX = 'flowing-menu__index';
const LABEL = 'flowing-menu__label';
const LABEL_TEXT = 'flowing-menu__label-text';
const DOT = 'flowing-menu__dot';
const END = 'flowing-menu__end';
const META = 'flowing-menu__meta';
const ARROW = 'flowing-menu__arrow';
const BAND = 'flowing-menu__band';
const PART = 'flowing-menu__part';
const PART_TEXT = 'flowing-menu__part-text';
const IMAGE = 'flowing-menu__image';

const SHAPES = ['pill', 'rounded', 'circle'];

export default function FlowingMenu({
  items = [],
  direction = 'left',
  textColor = '#ffffff',
  bgColor = '#120F17',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#120F17',
  borderColor = 'rgba(255, 255, 255, 0.14)',
  dividers = true,
  dimInactive = false,
  align = 'center',
  showIndex = false,
  showArrow = false,
  imageShape = 'pill',
  activeIndex,
  onItemClick,
  ariaLabel = 'Menu',
  className = '',
  style
}) {
  const [activeRow, setActiveRow] = useState(() => (typeof activeIndex === 'number' ? activeIndex : 0));

  const shape = SHAPES.includes(imageShape) ? imageShape : 'pill';
  const flowDir = direction === 'right' ? 'right' : 'left';
  const layoutScope = `flowingBand-${ariaLabel.replace(/\s+/g, '-').toLowerCase()}`;

  const handlePointerDown = (index) => {
    setActiveRow(index);
  };

  const handleClick = (item, index, event) => {
    event.preventDefault();
    if (event.pointerType === 'touch') {
      if (activeRow === index) {
        onItemClick?.(item, index, event);
      } else {
        setActiveRow(index);
      }
    } else {
      setActiveRow(index);
      onItemClick?.(item, index, event);
    }
  };

  return (
    <nav
      className={[ROOT, className].filter(Boolean).join(' ')}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        '--flowing-menu-border': borderColor,
        ...style
      }}
      aria-label={ariaLabel}
      data-align={align === 'left' ? 'left' : 'center'}
      data-shape={shape}
    >
      <ul className={LIST}>
        {items.map((item, index) => {
          const isActive = index === activeRow;
          const isSelected = index === activeIndex;

          const content = (
            <>
              <span className={INDEX} aria-hidden="true">
                {showIndex ? String(index + 1).padStart(2, '0') : null}
              </span>
              <span className={LABEL}>
                <span className={LABEL_TEXT}>{item.text}</span>
                {isSelected && <span className={DOT} aria-hidden="true" />}
              </span>
              <span className={END} aria-hidden="true">
                {item.meta ? <span className={META}>{item.meta}</span> : null}
                {showArrow ? (
                  <span className={ARROW}>
                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={22} strokeWidth={1.75} />
                  </span>
                ) : null}
              </span>
            </>
          );

          return (
            <li
              key={`${item.text}-${index}`}
              data-row-index={index}
              data-current={isActive ? '' : undefined}
              data-dimmed={dimInactive && !isActive ? '' : undefined}
              className={ITEM}
              onPointerEnter={(e) => {
                if (e.pointerType === 'touch') return;
                setActiveRow(index);
              }}
            >
              {dividers && index > 0 && <span className={DIVIDER} aria-hidden="true" />}

              {item.link ? (
                <a
                  className={LINK}
                  href={item.link}
                  aria-current={isActive ? 'page' : undefined}
                  onPointerDown={() => handlePointerDown(index)}
                  onClick={(e) => handleClick(item, index, e)}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className={LINK}
                  aria-current={isActive ? 'page' : undefined}
                  onPointerDown={() => handlePointerDown(index)}
                  onClick={(e) => handleClick(item, index, e)}
                >
                  {content}
                </button>
              )}

              {/* Liquid Sliding Active Band powered by Framer Motion layoutId */}
              {isActive && (
                <motion.div
                  layoutId={layoutScope}
                  className={BAND}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 32,
                    mass: 0.75
                  }}
                  style={{
                    backgroundColor: marqueeBgColor,
                    color: marqueeTextColor
                  }}
                  aria-hidden="true"
                >
                  <div className={`flowing-menu__marquee-stream flowing-menu__stream--${flowDir}`}>
                    {[0, 1].map((copy) => (
                      <div className={PART} key={copy}>
                        {item.flowItems ? (
                          item.flowItems.map((fi, fiIdx) => (
                            <span key={fiIdx} className="flowing-menu__pill-group">
                              <span className={PART_TEXT}>{fi.text}</span>
                              {fi.icon ? (
                                <span className="flowing-menu__tech-badge" aria-hidden="true">
                                  {fi.icon}
                                </span>
                              ) : fi.image ? (
                                <span
                                  className={IMAGE}
                                  style={{ backgroundImage: `url(${fi.image})` }}
                                  aria-hidden="true"
                                />
                              ) : null}
                            </span>
                          ))
                        ) : (
                          <>
                            <span className={PART_TEXT}>{item.marquee ?? item.text}</span>
                            {item.image && (
                              <span className={IMAGE} style={{ backgroundImage: `url(${item.image})` }} />
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
