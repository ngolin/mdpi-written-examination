import { usePopup } from './usePopup';
import search from './search.svg';
import avatar from './avatar.svg';
import menu from './menu.svg';
import logo from './logo.svg';

const items = ['Title One', 'Title Two', 'Title Three', 'Title Four'];

export const Header = () => {
  const { trigger, element } = usePopup({
    className: 'top-[48px] right-[30px] min-w-[122px] min-lg:hidden',
    items,
  });
  return (
    <header className="h-[70px] max-lg:h-[48px] bg-white border-b border-[#dcdfe4] pl-[13px] pr-[31px] max-lg:px-[30px] flex items-center z-1">
      <img src={logo} />
      <div className="flex max-lg:hidden gap-8 ml-[142px] cursor-pointer">
        {items.map(title => (
          <div key={title} className="min-w-[64px] h-[70px] leading-[70px] hover:bg-[#f5f5f5]">
            {title}
          </div>
        ))}
      </div>
      <div className="ml-auto flex max-lg:hidden items-center cursor-pointer gap-[22px]">
        <img className="hover:bg-[#f5f5f5]" src={search} />
        <div className="h-[24px] hover:bg-[#f5f5f5]">Log in</div>
        <div className="w-[78px] h-[40px] leading-[40px] text-center bg-[#facc15] rounded shadow-[0_4px_4px_0_#00000040]">
          Submit
        </div>
      </div>
      <div className="ml-auto hidden max-lg:flex items-center cursor-pointer gap-2 [&>img]:hover:bg-[#f5f5f5]">
        <img src={search} />
        <div className="h-[24px] w-[1px] bg-[#dcdfe4]" />
        <img src={avatar} />
        <img ref={trigger} src={menu} />
      </div>
      {element}
    </header>
  );
};
