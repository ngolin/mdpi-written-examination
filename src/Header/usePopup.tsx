import { useEffect, useRef, useState } from 'react';

export interface UsePopupProps {
  className?: string;
  items: string[];
}

export const usePopup = ({ className, items }: UsePopupProps) => {
  const trigger = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const { current } = trigger;
    if (current) {
      const handleOpen = (event: MouseEvent) => {
        event.stopPropagation();
        setIsOpen(isOpen => !isOpen);
      };
      const handleClose = () => {
        setIsOpen(false);
      };
      current.addEventListener('mousedown', handleOpen);

      document.addEventListener('mousedown', handleClose);
      return () => {
        current.removeEventListener('mousedown', handleOpen);
        document.removeEventListener('mousedown', handleClose);
      };
    }
  }, [trigger]);

  const element = isOpen ? (
    <div className={`${className} absolute bg-white rounded cursor-pointer shadow-[0_4px_5px_0_#353C5526]`}>
      {items.map(item => (
        <div key={item} className="hover:bg-[#f5f5f5] px-[28px] h-[51px] leading-[51px]">
          {item}
        </div>
      ))}
    </div>
  ) : null;

  return { trigger, element };
};
