import SvgIcon from '@components/SvgIcon';
import { HeaderBar } from '@components/HeaderBar';
import usePageControll from '@hooks/usePageControll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { naviState } from '@modules/atoms';
import { NavInfo, Page } from '@type/index';
import { useEffect } from 'react';
import { LeftView } from '@components/HeaderBar/HeaderBar.styled';

/* 페이지 라우팅 시 해당 부분 수정 필요. */
const noneHeaderTarget = ['', 'home'];
const pageLabel = {
  [Page.home]: '홈',
};

const Navbar = () => {
  const { navigation, handlePrevPage } = usePageControll();
  const set_navInfo = useSetRecoilState<NavInfo>(naviState);
  const get_navInfo = useRecoilValue<NavInfo>(naviState);

  useEffect(() => {
    set_navInfo((prev) => ({
      ...prev,
      page: window.location.pathname.slice(1),
    }));

    const handlePopState = () => {
      const url = window.location.pathname.slice(1);
      if (navigation.history.includes(url)) {
        const history = navigation.history.slice(0, navigation.history.findIndex((value) => value == url) + 1);
        set_navInfo({
          page: url,
          history: history,
        });
      } else {
        set_navInfo((prev) => ({
          page: url,
          history: [...prev.history, url],
        }));
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (noneHeaderTarget.includes(navigation.page)) {
      set_navInfo((prev) => ({
        ...prev,
        history: [navigation.page],
      }));
    }
  }, [navigation.page]);

  if (noneHeaderTarget.includes(navigation.page)) {
    return null;
  } else {
    return (
      <HeaderBar
        left=
          {
            <LeftView>
              <SvgIcon name={'back'} width={24} height={24} fill={'none'} />
              {pageLabel[get_navInfo.page]}
            </LeftView>
          }
        onClickLeft={handlePrevPage} />
    );
  }
};

export default Navbar;
