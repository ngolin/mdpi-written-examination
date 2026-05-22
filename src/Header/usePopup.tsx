import { useEffect, useRef, useState } from 'react';

export interface UsePopupProps {
  className?: string;
  items: string[];
  smaller?: boolean;
}

const SET_IS_OPEN: Array<React.Dispatch<React.SetStateAction<boolean>>> = [];

export const usePopup = ({ className, items, smaller }: UsePopupProps) => {
  const trigger = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const { current } = trigger;
    if (current) {
      const handleOpen = (event: MouseEvent) => {
        event.stopPropagation();
        for (const set of SET_IS_OPEN) {
          if (set !== setIsOpen) {
            set(false);
          }
        }
        setIsOpen(isOpen => !isOpen);
      };

      const handleClose = () => {
        setIsOpen(false);
      };

      document.addEventListener('mousedown', handleClose);
      current.addEventListener('mousedown', handleOpen);
      SET_IS_OPEN.push(setIsOpen);
      return () => {
        document.removeEventListener('mousedown', handleClose);
        current.removeEventListener('mousedown', handleOpen);
        SET_IS_OPEN.splice(SET_IS_OPEN.indexOf(setIsOpen), 1);
      };
    }
  }, [trigger]);

  const element = isOpen ? (
    <div className={`${className} absolute z-1 bg-white rounded cursor-pointer shadow-[0_4px_5px_0_#353C5526]`}>
      {items.map(item => (
        <div
          key={item}
          className={`hover:bg-[#f5f5f5] ${smaller ? 'px-[24px] h-[40px] leading-[40px]' : 'px-[28px] h-[51px] leading-[51px]'}`}
        >
          {item}
        </div>
      ))}
    </div>
  ) : null;

  return { trigger, element };
};
