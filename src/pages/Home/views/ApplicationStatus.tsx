import React, { useState } from 'react';
import { Container } from './View.styled';
import BackTextInput from '@components/BackTextinput';

const ApplicationStatus = () => {
  const [search, set_search] = useState("");

  return (
    <Container>
      <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
      수련회 등록 현황
    </Container>
  );
};

export default ApplicationStatus;