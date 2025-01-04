import React, { useState } from 'react';
import AllUser from './views/AllUser';
import ApplicationStatus from './views/ApplicationStatus';
import MediaLink from './views/MediaLink';
import SvgIcon from '@components/SvgIcon';
import BackItemButton from '@components/BackItemButton';
import { BackItemButtonContainer, Container, SideBar, TopView } from './HomeView.styled';
import IconButton from '@components/Button';
import { EColor } from '@styles/color';
import useConfirm from '@hooks/useConfirm';
import usePageControll from '@hooks/usePageControll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoadingState, userState } from '@modules/atoms';
import { requestLogout } from '@apis/index';
import Home from './views/Home';


const BackofficeView = () => {
  const { handlePage } = usePageControll();
  const setIsLoading = useSetRecoilState(isLoadingState);

  const user = useRecoilValue(userState);

  const [page, set_page] = useState(0);

  const handleLogout = useConfirm("로그아웃 하시겠습니까? ", async () => {
    setIsLoading({ isLoading: true });
    await localStorage.removeItem('access_token');
    await localStorage.removeItem('refresh_token');
    requestLogout(user.id).then(() => {
      window.location.href = 'management/login';
      alert("로그아웃이 완료되었습니다.");
      setIsLoading({ isLoading: false });
    }).catch((err) => {
      console.log(err);
      alert("로그아웃에 실패하였습니다.");
      setIsLoading({ isLoading: false });
    });
  }, () => null);
  return (
    <Container>
      <SideBar>
        <TopView>
          <SvgIcon name={'cba_logo'} width={150} height={150} fill={'none'} />
          <BackItemButtonContainer>
            <BackItemButton
              label="대시보드"
              onClick={() => set_page(0)}
              isClicked={page === 0}
            >
              <SvgIcon name={'home'} width={18} height={18} fill={'none'} stroke={EColor.TEXT_600}  />
            </BackItemButton>
            <BackItemButton
              label="전체 계정 정보"
              onClick={() => set_page(1)}
              isClicked={page === 1}
            >
              <SvgIcon name={'graph'} width={18} height={18} fill={'none'} />
            </BackItemButton>
            <BackItemButton
              label="수련회 등록 현황"
              onClick={() => set_page(2)}
              isClicked={page === 2}
            >
              <SvgIcon name={'document'} width={20} height={20} fill={'none'} stroke={EColor.TEXT_600} />
            </BackItemButton>
            <BackItemButton
              label="유튜브 실황 링크"
              onClick={() => set_page(3)}
              isClicked={page === 3}
            >
              <SvgIcon name={'youtube'} width={17} height={16} fill={EColor.TEXT_600} stroke={EColor.TEXT_600} />
            </BackItemButton>
          </BackItemButtonContainer>
        </TopView>
        <IconButton
          label={'로그아웃'}
          onClick={handleLogout}
          svg={<SvgIcon name={'logout'} width={20} height={20} fill={EColor.TEXT_500} />}
          backgroundColor={EColor.TEXT_200}
          borderWidth='0'
          color={EColor.TEXT_700}
          width='100%'
        />
      </SideBar>
      {page === 0 && <Home />}
      {page === 1 && <AllUser />}
      {page === 2 && <ApplicationStatus />}
      {page === 3 && <MediaLink />}
    </Container>
  );
};

export default BackofficeView;
