import React, { useState,useEffect } from 'react';
import { Container, HeaderText, HeaderView,DownloadButtonView } from './View.styled';
import BackTextInput from '@components/BackTextinput';
import { requestOriginApplication } from '@apis/index';
import { ApplicationCheck } from '@type/states';
import * as XLSX from 'xlsx';
import DownloadButton from '@components/DownloadButton';

const Home = () => {
  const [search, set_search] = useState("");
  const [data, set_data] = useState<ApplicationCheck[]>([]);
  const [filteredData, set_filteredData] = useState<ApplicationCheck[]>([]);
  
  useEffect(() => {
    requestOriginApplication().then((res) => {
        console.log("Data:", res.data.application);
        set_data(res.data.application);
      });
    }, []);
  useEffect(() => {
      const filteredData = data.filter(application => application.title === 'Holyday');
      set_filteredData(filteredData);
    }, [data]);

  const downloadExcel = () => {
    if (filteredData.length === 0) {
      alert("No data to download");
      return;
    }
    const formattedData = filteredData.map(({ name, group, gender, phone, birth, isLeader, attended, feePaid }) => {
      // 날짜 포맷팅 로직
      const formattedBirth = birth
        ? (() => {
            const date = new Date(birth);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
          })()
        : '';
      const formattedGender = gender === 'male' ? '남자' : gender === 'female' ? '여자' : '기타';

      return {
        이름: name,
        소그룹: group,
        성별: formattedGender,
        핸드폰: phone,
        생년월일: formattedBirth,
        리딩자여부: isLeader,
        납부: feePaid,
        참석: attended,
      };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "등록현황");

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const fileName = `${year}-${month}-${day} 등록현황.xlsx`;

    XLSX.writeFile(workbook,fileName);
  };
  

  return (
    <Container>
      <HeaderView>
        <HeaderText>대시보드</HeaderText>
        <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
        <HeaderText></HeaderText>
      </HeaderView>
      <DownloadButtonView>
        <DownloadButton onClick={downloadExcel}>수련회 등록 현황 <br /> 엑셀 파일 다운로드</DownloadButton>
      </DownloadButtonView>
    </Container>
  );
};

export default Home;