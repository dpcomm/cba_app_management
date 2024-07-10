import SvgIcon from "@components/SvgIcon";
import { Body, ButtonView, Container, TitleSubText, TitleText } from "./styles";
import { IconButton } from "@components/IconButton";
import usePageControll from "@hooks/usePageControll";
import { EColor } from "@styles/color";

const MaintenanceView = () => {
  const { handlePage } = usePageControll();
  return (
    <Container>
      <SvgIcon name={"cba_logo"} width={188} height={188} fill={""} />
      <TitleText>
        CBA Connect Management
      </TitleText>
      <TitleSubText>
        
      </TitleSubText>
      <Body>
        Unauthorized user
        <br />
        로그인이 필요한 페이지입니다.
        <br />
        <ButtonView>
          <IconButton
            label={'돌아가기'}
            height='32px'
            onClick={() => handlePage('management/login')}
            color={EColor.TEXT_200}
            backgroundColor={EColor.COLOR_PRIMARY_SUB1}
            borderRadius='8px'
            borderWidth="0"
          />
        </ButtonView>
      </Body>
    </Container>
  );
};

export default MaintenanceView;