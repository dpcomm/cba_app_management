import React, { useEffect, useState } from 'react';
import { CheckBox, Container, LoginInputView, LogoBold, LogoLight, LogoSub, LogoView, TextButton, TextButtonView } from './LoginView.styled';
import TextInput from '@components/TextInput';
import SvgIcon from '@components/SvgIcon';
import { EColor } from '@styles/color';
import { IconButton } from '@components/IconButton';
import usePageControll from '@hooks/usePageControll';
import { requestLogin } from '@apis/index';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoadingState, userState } from '@modules/atoms';


const LoginView = () => {
	const { handlePage } = usePageControll();

	const [id, set_id] = useState("");
	const [password, set_password] = useState("");
	const [autoLogin, set_autoLogin] = useState(false);
	const [user, setUser] = useRecoilState(userState);
	const setIsLoading = useSetRecoilState(isLoadingState);

	useEffect(() => {
		user.userId && handlePage("home");
	}, []);

	const handleCheckBox = () => {
		set_autoLogin(!autoLogin);
	};

	const handleLogin = async () => {
		if ( !id || !password) return alert("아이디와 비밀번호을 입력해주세요.");
		setIsLoading({ isLoading: true });
		requestLogin(id, password, autoLogin)
		.then(async (res) => {
			const payload = res?.data?.data ?? res?.data ?? res;
			if (!payload) {
				setIsLoading({ isLoading: false });
				return alert('로그인 응답이 올바르지 않습니다. 다시 시도해주세요.');
			}
			if (payload.user && payload.user.rank === "M") {
				setIsLoading({ isLoading: false });
				return alert("접근 권한이 없습니다. 관리자에게 문의하시기 바랍니다.");
			}
			const u = payload.user ?? {};
			setUser({
				id: u.id ?? null,
				userId: u.userId ?? "",
				rank: u.rank ?? "M",
				password: u.password ?? "",
				name: u.name ?? "",
				group: u.group ?? "",
				phone: u.phone ?? "",
				birth: u.birth ?? "",
				gender: u.gender ?? "",
			});
			await localStorage.setItem('access_token', payload.accessToken ?? payload.data?.accessToken ?? '');
			if (autoLogin) {
				await localStorage.setItem('refresh_token', payload.refreshToken ?? payload.data?.refreshToken ?? '');
			}
			handlePage('home');
			alert("로그인에 성공하였습니다.");
			setIsLoading({ isLoading: false });
		}).catch((err) => {
			setIsLoading({ isLoading: false });
			const message = err?.response?.data?.message ?? err?.message ?? '';
			if (message === "Unregisterd user") return alert("존재하지 않는 유저입니다.");
			if (message === "Incorrect password") return alert("비밀번호가 일치하지 않습니다.");
			return alert("잘못된 접근입니다.");
		});
	};

	return (
		<Container>
			<LogoView>
				<LogoLight>Welcome to</LogoLight>
				<LogoBold>CBA</LogoBold>
				<LogoSub>Management Console</LogoSub>
			</LogoView>
			<LoginInputView>
				<TextInput
					svg={<SvgIcon name={'id'} width={32} height={32} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} />}
					placeHolder={"아이디"}
					getter={id}
					setter={set_id}
				/>
				<TextInput
					svg={<SvgIcon name={'password'} width={32} height={32} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} />}
					placeHolder={"비밀번호"}
					getter={password}
					setter={set_password}
					type='password'
				/>
				<IconButton
					// svg={<SvgIcon name={'login'} width={24} height={24} fill={EColor.COLOR_PRIMARY} stroke={EColor.COLOR_PRIMARY} />}
					label={'로그인'}
					width={"100%"}
					height={"52px"}
					borderRadius='48px'
					backgroundColor={EColor.TEXT_300}
					tintColor='white'
					color='black'
					onClick={() => handleLogin()}
				/>
				<CheckBox onClick={handleCheckBox}>
					<SvgIcon
						name={'check'}
						width={24}
						height={24}
						fill={autoLogin ? EColor.COLOR_PRIMARY_SUB1 : EColor.TEXT_500}
					/>
					로그인 유지
				</CheckBox>
			</LoginInputView>
			<TextButtonView>
				<TextButton>
					이 페이지는 CBA Connect의 관리 페이지로
					<br />
					관리 권한이 있는 사용자만 접근할 수 있습니다.
					<br />
					권한이 없는 경우, 접근이 제한되오니 관리자에게 문의하시기 바랍니다.
				</TextButton>
			</TextButtonView>
		</Container>
  );
};

export default LoginView;