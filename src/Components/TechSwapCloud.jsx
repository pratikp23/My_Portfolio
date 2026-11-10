import { memo } from "react";
import FlexCarousel from "./FlexCarousel/FlexCarousel";

const TECH_ITEMS = [
  { src: '/tech/react.png', alt: 'React.js', title: 'React.js', subtitle: 'Frontend Architecture' },
  { src: '/tech/nextjs.png', alt: 'Next.js', title: 'Next.js', subtitle: 'Full Stack Framework' },
  { src: '/tech/typescript.png', alt: 'TypeScript', title: 'TypeScript', subtitle: 'Type-Safe Systems' },
  { src: '/tech/nodejs.png', alt: 'Node.js', title: 'Node.js', subtitle: 'Backend Runtime' },
  { src: '/tech/python.png', alt: 'Python', title: 'Python', subtitle: 'AI & Data Engineering' },
  { src: '/tech/docker.png', alt: 'Docker', title: 'Docker', subtitle: 'Containers & Microservices' },
  { src: '/tech/mongodb.png', alt: 'MongoDB', title: 'MongoDB', subtitle: 'NoSQL Document Store' },
  { src: '/tech/postgresql.png', alt: 'PostgreSQL', title: 'PostgreSQL', subtitle: 'Relational Database' },
  { src: '/tech/redis.png', alt: 'Redis', title: 'Redis', subtitle: 'In-Memory Cache & Queue' },
  { src: '/tech/tailwind.png', alt: 'Tailwind CSS', title: 'Tailwind CSS', subtitle: 'Modern Design Systems' },
  { src: '/tech/express.png', alt: 'Express.js', title: 'Express.js', subtitle: 'RESTful API Services' },
  { src: '/tech/github.png', alt: 'GitHub & Git', title: 'GitHub & Git', subtitle: 'CI/CD & Version Control' }
];

function TechSwapCloud() {
  return (
    <div className="tech-swap-cloud w-full mt-4 pt-1 pb-1 border-t border-white/[0.08] bg-[#08090c]/85 backdrop-blur-md overflow-hidden flex flex-col items-center">
      <div className="w-full h-[250px] sm:h-[280px] md:h-[310px] relative">
        <FlexCarousel
          items={TECH_ITEMS}
          preset="liquid"
          intro="rise"
          cardHeight={0.54}
          gap={14}
          radius={14}
          fit="portrait"
          squeeze={0.2}
          focusOnClick={true}
          autoplay={true}
          interval={3.5}
          captions={true}
          captureWheel={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default memo(TechSwapCloud);
