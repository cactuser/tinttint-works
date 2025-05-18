import './flipBook.css';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export type Page = {
  id: string;
  type: 'page';
  photoUrl?: string;
};

export type Cover = {
  id: string;
  type: 'cover';
  title: string;
  photoUrl?: string;
  bgColor: string;
};

export type BackCover = {
  id: string;
  type: 'backCover';
  bgColor: string;
};

type Sheet = {
  front: Page | Cover | BackCover;
  back: Page | Cover | BackCover;
};

const SheetElement = ({
  sheet,
  isFlipped,
  zIndex,
}: {
  sheet: Sheet;
  isFlipped: boolean;
  zIndex: number;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    const runAnimation = async () => {
      // 翻下頁，先翻頁，再更新 zIndex
      if (isFlipped) {
        await controls.start({
          rotateY: -180,
          transition: { duration: 0.8, ease: 'easeInOut' },
        });
        await controls.start({
          zIndex,
        });
      } else {
        // 翻上頁，先更新 zIndex，再翻頁
        await controls.start({
          zIndex,
        });
        await controls.start({
          rotateY: 0,
          transition: { duration: 0.8, ease: 'easeInOut' },
        });
      }
    };
    runAnimation();
  }, [isFlipped, controls, zIndex]);

  return (
    <motion.div
      animate={controls}
      initial={false}
      style={{
        width: '400px',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: '50%',
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="page front"
        style={sheet.front.type === 'cover' ? { backgroundColor: sheet.front.bgColor } : {}}
      >
        {sheet.front.type === 'page' && <img src={sheet.front.photoUrl} />}
        {sheet.front.type === 'cover' && (
          <>
            <span>{sheet.front.title}</span>
            <img src={sheet.front.photoUrl} />
          </>
        )}
      </div>
      <div
        className="page back"
        style={sheet.back.type === 'backCover' ? { backgroundColor: sheet.back.bgColor } : {}}
      >
        {sheet.back.type === 'page' && <img src={sheet.back.photoUrl} />}
      </div>
    </motion.div>
  );
};

interface FlipBookProps {
  bookName: string;
  coverImageUrl: string;
  bgColor: string;
  pages: Page[];
}

export default function FlipBook({ pages, coverImageUrl, bookName, bgColor }: FlipBookProps) {
  const [flippedCount, setFlippedCount] = useState(0);

  const sheets = (() => {
    const sheets: Sheet[] = [];

    const backCover: BackCover = {
      id: 'backCover',
      type: 'backCover',
      bgColor,
    };

    const result: (Page | BackCover | Cover)[] = [
      { id: 'cover', type: 'cover', title: bookName, photoUrl: coverImageUrl, bgColor },
      ...pages,
    ];

    if (result.length % 2 === 0) {
      result.concat([{ id: 'backCover_front', type: 'page' }, backCover]);
    } else {
      result.push(backCover);
    }

    for (let i = 0; i < result.length; i += 2) {
      sheets.push({
        front: result[i],
        back: result[i + 1] ?? backCover,
      });
    }

    return sheets;
  })();

  const nextPage = () => {
    if (flippedCount < sheets.length) {
      setFlippedCount(flippedCount + 1);
    }
  };

  const prevPage = () => {
    if (flippedCount > 0) {
      setFlippedCount(flippedCount - 1);
    }
  };

  return (
    <div className="flip-book-container">
      {sheets.map((sheet, index) => {
        const isFlipped = index < flippedCount;
        const zIndex = isFlipped ? index : sheets.length - index;

        return <SheetElement key={index} sheet={sheet} isFlipped={isFlipped} zIndex={zIndex} />;
      })}
      <button className="flip-button prev" onClick={prevPage} disabled={flippedCount < 1}>
        ‹
      </button>
      <button
        className="flip-button next"
        onClick={nextPage}
        disabled={flippedCount === sheets.length}
      >
        ›
      </button>
    </div>
  );
}
