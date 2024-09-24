'use client'; // 클라이언트 전용 컴포넌트

import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GNB } from '../../components/GNB';
import { GNB_TYPE } from '../../constants/common';
import { ProductInCart } from '../../components/ProductInCart';
import { Box } from '../../styles/StyleComponent';
import { CartContext } from '../../context/CartContext';
import { useCartStore } from '../../store/CartStore';
function CartPage() {
    const { cart, setCart } = useCartStore(); // Context 사용

    return (
        <Base>
            <GNB type={GNB_TYPE.MAIN} />
            <Inner>
                <Box gap={30}>
                    {cart.map((product, id) => (
                        <ProductInCart key={id} product={product} cart={cart} setCart={setCart} />
                    ))}
                </Box>
            </Inner>
        </Base>
    );
}
export default CartPage;
const Base = styled.div`
    width: 100%;
`;
const Inner = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 72px 20px 69px;
`;
const Text = styled.div`
    font-family: 'Pretendard Variable', sans-serif;
    font-size: 20px;
    font-weight: 550;
    line-height: 135%;
    text-align: center;
    color: #717171;

    width: 100%;
    margin-top: 60px;
`;
