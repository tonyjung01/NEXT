import React, { useEffect, useState } from 'react';
import './SubwayInfo.css';

const SubwayInfo = () => {
  const [subwayData, setSubwayData] = useState([]);
  const [selectedLine, setSelectedLine] = useState(''); // 추가된 state

  const subwayLineMap = {
    '1001': { name: '1호선', className: 'line-1' },
    '1002': { name: '2호선', className: 'line-2' },
    '1003': { name: '3호선', className: 'line-3' },
    '1004': { name: '4호선', className: 'line-4' },
    '1005': { name: '5호선', className: 'line-5' },
    '1006': { name: '6호선', className: 'line-6' },
    '1007': { name: '7호선', className: 'line-7' },
    '1008': { name: '8호선', className: 'line-8' },
    '1009': { name: '9호선', className: 'line-9' },
    '1063': { name: '경의중앙선', className: 'line-K' },
    '1065': { name: '공항철도', className: 'line-A' },
    '1067': { name: '경춘선', className: 'line-G' },
    '1075': { name: '수인분당선', className: 'line-B' },
    '1077': { name: '신분당선', className: 'line-S' },
    '1091': { name: '자기부상철도', className: 'line-M' },
    '1092': { name: '우이신설선', className: 'line-U' },
  };

  useEffect(() => {
    const fetchSubwayData = async () => {
      try {
        const response = await fetch(
          `http://swopenapi.seoul.go.kr/api/subway/${process.env.REACT_APP_SEOUL_API_KEY}/json/realtimeStationArrival/0/1000/`
        );
        const data = await response.json();
        setSubwayData(data.realtimeArrivalList);
      } catch (error) {
        console.error('Error fetching the subway data:', error);
      }
    };

    fetchSubwayData();
  }, []);

  const filteredSubwayData = selectedLine
    ? subwayData.filter((info) => info.subwayId === selectedLine)
    : subwayData;

  return (
    <div className="subwayInfo-container">
      <h1>서울시 지하철 실시간 정보</h1>
      <div className="subwayInfo-filter">
        <label htmlFor="line-select">호선 선택: </label>
        <select
          id="line-select"
          value={selectedLine}
          onChange={(e) => setSelectedLine(e.target.value)}
        >
          <option value="">전체</option>
          {Object.entries(subwayLineMap).map(([id, line]) => (
            <option key={id} value={id}>{line.name}</option>
          ))}
        </select>
      </div>
      <ul>
        {filteredSubwayData.map((info) => (
          <li key={info.trainNo} className={subwayLineMap[info.subwayId]?.className}>
            {info.trainLineNm} - {info.arvlMsg2} ({subwayLineMap[info.subwayId]?.name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubwayInfo;
