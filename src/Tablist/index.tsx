import { List } from './List';

export interface Tablist {
  list: Array<Omit<List, 'onChange'>>;
  onChange?: (list: Array<Omit<List, 'onChange'>>) => void;
}

export const Tablist = ({ list, onChange }: Tablist) => {
  return (
    <div className="bg-white max-w-[1544px] mx-auto py-[48px] min-h-[calc(100vh-70px)]">
      <div className="max-w-[1143px] mx-auto">
        {list.map((item, index) => (
          <List key={index} {...item} onChange={item => onChange?.(list.map((l, i) => (i === index ? item : l)))} />
        ))}
      </div>
    </div>
  );
};
