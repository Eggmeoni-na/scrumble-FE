import { HeaderTemplate } from '@/components/common/Header';

const DefaultHeader = () => {
  return (
    <HeaderTemplate>
      <HeaderTemplate.BackButton />
      <HeaderTemplate.RightMenuWrapper>
        <HeaderTemplate.ToggleThemeButton />
        <HeaderTemplate.AlarmButton />
      </HeaderTemplate.RightMenuWrapper>
    </HeaderTemplate>
  );
};

export default DefaultHeader;
