import { Switch } from './Switch';
import { Radio } from './Ratio';
import remove from './remove.svg';
import more from './more.svg';
import { usePopup } from '../Header/usePopup';

export interface List {
  title: string;
  checked: boolean;
  items: Array<Omit<ListItem, 'onChange'>>;
  onChange: (list: Omit<List, 'onChange'>) => void;
}

export const List = ({ title, checked, items, onChange }: List) => {
  return (
    <div className="px-[24px] py-[52px]">
      <div className="flex justify-between h-[40px] border-b border-[#dcdfe4]">
        <div className="text-[16px] italic text-black">{title}</div>
        <Switch checked={checked} onChange={() => onChange({ title, checked: !checked, items })} />
      </div>
      <div className="mt-[17px] flex flex-col gap-2">
        {items.map((item, index) => (
          <ListItem
            key={index}
            {...item}
            onChange={value =>
              onChange({ title, checked, items: items.map((item, i) => (i === index ? { ...item, value } : item)) })
            }
          />
        ))}
      </div>
    </div>
  );
};

interface ListItem {
  label: string;
  value: 'weekly' | 'monthly';
  onChange: (value: ListItem['value']) => void;
}

const ListItem = ({ label, value, onChange }: ListItem) => {
  const { trigger, element } = usePopup({
    items: ['Share', 'Edit'],
    className: 'top-[53px] right-[32px] min-w-[106px]',
    smaller: true,
  });
  return (
    <div className="h-[53px] bg-[#F8F9FD] flex items-center px-[16px] gap-6 [&>img]:cursor-pointer [&>img]:hover:bg-[#dcdfe4] relative">
      <div className="mr-auto">{label}</div>
      <Radio
        value={value}
        onChange={onChange}
        items={[
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
        ]}
      />
      <img src={more} ref={trigger} />
      <img src={remove} />
      {element}
    </div>
  );
};
