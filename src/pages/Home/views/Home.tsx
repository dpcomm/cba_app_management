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
        const payload = res?.data?.data ?? res?.data ?? res;
        console.log("Data:", payload?.application ?? payload?.application ?? undefined);
        set_data(payload?.application ?? []);
      }).catch((err) => {
        console.error('requestOriginApplication error', err);
        set_data([]);
      });
    }, []);
  useEffect(() => {
      const filteredData = data.filter(application => application.title === 'Kingdom of God');
      set_filteredData(filteredData);
    }, [data]);

  const downloadExcel = () => {
    if (filteredData.length === 0) {
      alert("No data to download");
      return;
    }
    const formattedData = filteredData.map(({ name, group, gender, phone, birth, isLeader, attended, feePaid,meal,transfer,ownCar,bus }) => {
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
      
      // 출발편 설정
      let departure = '';
      if (bus?.[0] === 1) {
        departure = '본대대형버스';
      } else if (bus?.[0] === 2) {
        departure = '후발대대형버스';
      } else if (bus?.[0] === 0) {
        if (ownCar) {
          departure = '자차';
        } else if (transfer === '대중교통') {
          departure = '대중교통';
        }
      }

      // 도착편 설정
      let arrival = '';
      if (bus?.[1] === 1) {
        arrival = '대형버스';
      } else if (bus?.[1] === 0) {
        if (ownCar) {
          arrival = '자차';
        } else {
          arrival = '대중교통';
        }
      }

      const mealDay1 = JSON.stringify(meal?.[0]) === JSON.stringify([1, 1, 1]);
      const mealDay2 = JSON.stringify(meal?.[1]) === JSON.stringify([1, 1, 1]);
      const mealDay3 = JSON.stringify(meal?.[2]) === JSON.stringify([1, 1, 1]);

      return {
        이름: name,
        소그룹: group,
        성별: formattedGender,
        핸드폰: phone,
        생년월일: formattedBirth,
        출발편: departure,
        도착편: arrival,
        차량번호: ownCar,
        '7/11 식사': mealDay1,
        '7/12 식사': mealDay2,
        '7/13 식사': mealDay3,
        // 리딩자여부: isLeader,
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