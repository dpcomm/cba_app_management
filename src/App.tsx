import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@pages/Login';
import Home from '@pages/Home';
import { Page } from './types';
import Error404 from '@pages/Error404';
import Maintenance from '@pages/Maintenance';
import PrivateRoute from '@utils/PrivateRoute';
import { useEffect } from 'react';
import { requestAuthCheck } from './apis';
import { isLoadingState, userState } from '@modules/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import NotLogin from '@pages/NotLogin';
import Spinner from '@components/Spinner';

const App = () => {
  const setUser = useSetRecoilState(userState);
	const isLoading = useRecoilState(isLoadingState);

  useEffect(() => {
		handleAuthCheck();
	}, []);

	const handleAuthCheck = async () => {
		const accessToken = await localStorage.getItem('access_token');
		const refreshToken = await localStorage.getItem('refresh_token');

		requestAuthCheck(accessToken, refreshToken)
		.then((res) => {
			if (!res.data.user) return;
			if (res.data.user.rank === "M") {
				alert("본 페이지는 관리자 권한이 필요한 페이지입니다.");
				return window.location.href = 'https://recba.me';
			}
			setUser({
				id: res.data.user.id,
				userId: res.data.user.userId,
				rank: res.data.user.rank,
				password: res.data.user.password,
				name: res.data.user.name,
				group: res.data.user.group,
				phone: res.data.user.phone,
				birth: res.data.user.birth,
				gender: res.data.user.gender,
			});
			if (window.location.pathname == '/management/login') window.location.href = '/management/home';
		}).catch(async (err) => {
			setUser({
				id: null,
				userId: "",
				rank: "M",
				password: "",
				name: "",
				group: "",
				phone: "",
				birth: "",
				gender: "",
			});
			if (!err.response || !err.response.data) return console.log("An unexpected error occurred:", err);
			if (err.response.data.message === "Token not exist") return;
			if (err.response.data.message === "Unauthorized user") return alert("로그인이 필요합니다.");
		});
	};

  return (
    <BrowserRouter basename='/management'>
			{isLoading[0].isLoading && <Spinner />}
      <Routes>
        <Route path={`/${Page.login}`} element={<Login />} />
				<Route path={`/${Page.notLogin}`} element={<NotLogin />} />
        <Route path={`/${Page.maintenance}`} element={<Maintenance />} />
        <Route element={<PrivateRoute />}>
          <Route path={`/${Page.home}`} element={<Home />} />
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
