export interface Switch {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch = ({ checked, onChange }: Switch) => {
  return (
    <div
      className={`relative inline-block w-[40px] h-[20px] rounded-full cursor-pointer transition-all duration-300 ${checked ? 'bg-[#0156ce]' : 'bg-[#dcdfe4]'}`}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white transition-all duration-300 ${checked ? 'left-[23px]' : 'left-[3px]'}`}
      />
    </div>
  );
};
