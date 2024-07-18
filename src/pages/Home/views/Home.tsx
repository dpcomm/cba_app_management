import React, { useState } from 'react';
import { Container, HeaderText, HeaderView } from './View.styled';
import BackTextInput from '@components/BackTextinput';

const Home = () => {
  const [search, set_search] = useState("");
  return (
    <Container>
      <HeaderView>
        <HeaderText>대시보드</HeaderText>
        <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
        <HeaderText></HeaderText>
      </HeaderView>
    </Container>
  );
};

export default Home;