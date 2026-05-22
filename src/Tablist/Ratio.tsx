import type { Switch} from './Switch';

export interface Radio<T extends string | number> {
  items: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
}

export const Radio = <T extends string | number>({ items, value, onChange }: Radio<T>) => {
  return (
    <div className="flex items-center gap-4 cursor-pointer">
      {items.map(item => (
        <RadioItem
          key={item.value}
          checked={value === item.value}
          onChange={() => onChange(item.value)}
          title={item.label}
        />
      ))}
    </div>
  );
};

interface RadioItem extends Switch {
  title: string;
}

const RadioItem = ({ checked, onChange, title }: RadioItem) => {
  return (
    <div className="group flex items-center gap-1 cursor-pointer" onClick={() => onChange(!checked)}>
      <div
        className={`rounded-full m-[1px] w-[14px] h-[14px] border flex items-center justify-center transition-all duration-300 ${checked ? 'border-[#0156ce]' : 'border-[#dcdfe4] group-hover:border-[#0156ce]'}`}
      >
        <div
          className={`rounded-full  w-[7px] h-[7px] transition-all duration-300 ${checked ? 'bg-[#0156ce]' : 'bg-white'}`}
        />
      </div>
      <div>{title}</div>
    </div>
  );
};
