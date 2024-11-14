import { HeaderTemplate } from '@/components/common/Header';

const DefaultHeader = () => {
  return (
    <HeaderTemplate>
      <HeaderTemplate.BackButton />
      <HeaderTemplate.RightMenuWrapper>
        <HeaderTemplate.ToggleThemeButton />
        <HeaderTemplate.NotificationsButton />
      </HeaderTemplate.RightMenuWrapper>
    </HeaderTemplate>
  );
};

export default DefaultHeader;
