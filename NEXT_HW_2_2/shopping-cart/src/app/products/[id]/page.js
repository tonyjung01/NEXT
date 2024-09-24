'use client'; // 클라이언트 전용 컴포넌트

import React, { useContext } from 'react';
import { Button } from '../../../components/Button';
import styled from '@emotion/styled';
import { GNB } from '../../../components/GNB';
import { GNB_TYPE, PRODUCTS } from '../../../constants/common';
import { useRouter } from 'next/router'; // react-router-dom 대신 next/router 사용
import { CartContext } from '../../../context/CartContext';
import { useCartStore } from '../../../store/CartStore';

function ProductPage() {
    const router = useRouter();
    const { id } = router.query; // useParams 대신
    const product = PRODUCTS[parseInt(id)];
    const { cart, setCart } = useCartStore();

    const handleCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      alert("이미 장바구니에 추가된 상품입니다.");
      return;
    }
    const newCart = [...cart, product];
    setCart(newCart);
    alert("장바구니에 추가되었습니다.");
  };

  return (
    <Base>
      <GNB type={GNB_TYPE.BACK} pageName="상품 상세" />
      <Inner>
        <Title>
          상품 이름: <Highlight>{product.name}</Highlight>
        </Title>
        <Desc>
          <Highlight>{product.description}</Highlight>
        </Desc>
        <Price>
          상품 가격: <Highlight>{product.price}원</Highlight>
        </Price>
        <Button onClick={() => handleCart(product)}>장바구니 담기</Button>
      </Inner>
    </Base>
  );
}

export default ProductPage;

const Base = styled.div`
    width: 100%;
`;
const Inner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    padding: 72px 20px 69px;
`;
const Text = styled.div`
    font-family: 'Pretendard Variable', sans-serif;
    color: black;
    text-align: start;
    word-break: break-all;
`;
const Title = styled(Text)`
    font-size: 28px;
    font-weight: 500;
    line-height: 135%;
`;
const Desc = styled(Text)`
    font-size: 20px;
    font-weight: 500;
    line-height: 135%;
`;
const Price = styled(Text)`
    font-size: 24px;
    font-weight: 500;
    line-height: 135%;
`;
const Highlight = styled.span`
    background: linear-gradient(to bottom, pink 70%, transparent 60%);
    background-size: 100% 40%;
    background-repeat: no-repeat;
    background-position: 0 100%; /* Bottom alignment */
`;
