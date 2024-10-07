import { HeaderTemplate } from '@/components/common/Header';

const DefaultHeader = () => {
  return (
    <HeaderTemplate>
      <HeaderTemplate.BackButton />
      <HeaderTemplate.RightMenu>
        <HeaderTemplate.ToggleTheme />
        <HeaderTemplate.AlarmButton />
      </HeaderTemplate.RightMenu>
    </HeaderTemplate>
  );
};

export default DefaultHeader;
