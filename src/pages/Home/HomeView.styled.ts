import styled from "styled-components";
import { EColor } from "@styles/color";
import { Title3, Title6, body1, body3, body6 } from "@styles/font";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh;
	justify-content: center;
	align-items: center;
	padding-right: 42px;
	padding-left: 42px;
`;

export const LogoView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	user-select: none;
`;

export const LogoLight = styled.div`
	${Title6};
	font-size: 38px;
	color: ${EColor.COLOR_PRIMARY_SUB2};
	letter-spacing: 2px;
	user-select: none;
`;

export const LogoBold = styled.div`
	${Title3}
	font-size: 64px;
	color: ${EColor.COLOR_PRIMARY};
	letter-spacing: 7px;
	margin-top: -16px;
	user-select: none;
`;

export const LoginInputView = styled.div`
	width: 100%;
	margin-top: 24px;
`;

export const TextButtonView = styled.div`
	width: 100%;
	margin-top: 36px;
`;

export const TextButton = styled.div`
	display: flex;
	width: 100%;
	margin: 8px;
	${body3};
	color: ${EColor.TEXT_600};
	justify-content: center;
	align-items: center;
`;

export const NameText = styled.div`
	${body1};
	font-size: 24px;
	color: ${EColor.TEXT_900};
	letter-spacing: 2px;
	padding-top: 6%;
	padding-bottom: 6%;
`;

export const DDayView = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-bottom: 32px;
	gap: 12px;
`;

export const DDayTest = styled.div`
	${body1};
	font-size: 32px;
	letter-spacing: 2px;
	color: ${EColor.TEXT_900};
	user-select: none;
`;

export const MenuView = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 12px;
`;

export const ItemView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-left: 36px;
	padding-right: 36px;
`;

export const ItemText = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	${body3};
	word-break: break-all;
	color: ${EColor.TEXT_500};
	margin-top: 10px;
	text-align: center;
	user-select: none;
`;

export const Line = styled.div`
	display: flex;
	background-color: ${EColor.TEXT_500};
	width: 1px;
	height: 64px;
	border-radius: 12px;
`;

export const ButtonView = styled.div`
	display: flex;
	width: 100%;
	margin-top: 6%;
	justify-content: center;
`;

export const TextLight = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	${body6};
	color: ${EColor.TEXT_500};
	margin-top: 4px;
`;